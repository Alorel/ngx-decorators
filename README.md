[![NpmVersion](https://img.shields.io/npm/v/ngx-decorate.svg?style=flat-square)](https://www.npmjs.com/package/ngx-decorate)
[![Travis (.com) branch](https://img.shields.io/travis/com/Alorel/ngx-decorators/2.0.3.svg?style=flat-square)](https://travis-ci.com/Alorel/ngx-decorators)
[![Coveralls github branch](https://img.shields.io/coveralls/github/Alorel/ngx-decorators/2.0.3.svg?style=flat-square)](https://coveralls.io/github/Alorel/ngx-decorators)
[![CodeFactor](https://www.codefactor.io/repository/github/alorel/ngx-decorators/badge)](https://www.codefactor.io/repository/github/alorel/ngx-decorators)
[![codebeat badge](https://codebeat.co/badges/b2f3eead-f17f-4b9c-8861-d226057cef30)](https://codebeat.co/projects/github-com-alorel-ngx-decorators-master)
[![Greenkeeper badge](https://badges.greenkeeper.io/Alorel/ngx-decorators.svg)](https://greenkeeper.io/)

Useful decorators for Angular 2 and above. Full API docs available [here](https://alorel.github.io/ngx-decorators/)

-----

# Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Basic principle](#basic-principle)
- [IMPORTANT: AoT compilation notice](#important-aot-compilation-notice)
- [Decorators](#decorators)
  - [CdrProp - automatically trigger change detection](#cdrprop---automatically-trigger-change-detection)
  - [Complete - automatically complete a subject](#complete---automatically-complete-a-subject)
  - [LazySubject - create a subject lazily](#lazysubject---create-a-subject-lazily)
  - [SubjectSetter - mirror a property to a subject](#subjectsetter---mirror-a-property-to-a-subject)
  - [SubscribeTo - set a property's value from an observable](#subscribeto---set-a-propertys-value-from-an-observable)
  - [TrackDestroyed - set the property to true during OnDestroy](#trackdestroyed---set-the-property-to-true-during-ondestroy)
  - [TrackInit - set the property to true during ngOnInit](#trackinit---set-the-property-to-true-during-ngoninit)
  - [Unsubscribe - automatically unsubscribe from subscriptions](#unsubscribe---automatically-unsubscribe-from-subscriptions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

```bash
npm install ngx-decorate
```

Or use the CDN version:

```html
<script src="https://cdn.jsdelivr.net/npm/ngx-decorate@2.0.3/dist/ngx-decorators.umd.min.js"></script>
```

The AMD name is `NgxDecorate`.

# Basic principle

Angular apps have a lot of repetitive code - completing subjects, unsubscribing, triggering change detection etc.
This library hooks into a component's `OnInit` and `OnDestroy` hooks and does all the magic for you.
If your component already has an `OnInit` or `OnDestroy` hook, it will still be called.

# IMPORTANT: AoT compilation notice

**IMPORTANT**: For the decorators to work in AoT mode the classes *must* contain the `ngOnInit` and `ngOnDestroy`
methods. It is currently not possible to provide this functionality in the form of a Webpack plugin because
`@ngtools/webpack` ignores loader input. Until this ceases to be the case you can use the `ngx-decorate-preprocessor`
tool:

```bash
npm install -D ngx-decorate-preprocessor

ngx-decorate-preprocess format --globs "src/my-app/**/*.ts" --indent 2
```

To test whether your files are valid you can use the test command, which will exit with a non-zero code if formatting
is needed:

```bash
ngx-decorate-preprocess test --globs "src/my-app/**/*.ts" --indent 2
```

# Decorators
## CdrProp - automatically trigger change detection

Before:

```typescript
@Component({})
export class Foo {
  private _prop: string;

  public constructor(private readonly cdr: ChangeDetectorRef) {}
  
  public get prop(): string {
    return this._prop;
  }
  
  public set prop(v: string) {
    this._prop = v;
    this.cdr.detectChanges();
  }
}
```

After:

```typescript
@Component({})
export class Foo {
  @CdrProp('cdr')
  public prop: string;

  public constructor(private readonly cdr: ChangeDetectorRef) {}
}
```

API:

```typescript
export declare type ConfEnum = Pick<PropertyDescriptor, 'configurable' | 'enumerable'>;

export interface CdrPropConfig {
    /** Default value to set on the prototype */
    default?: any;
    /** Partial property descriptor */
    desc?: ConfEnum;
    /**
     * Key of a property used for tracking whether the component's been destroyed
     * to prevent errors caused by triggering change detection on a destroyed component.
     */
    destroyed?: PropertyKey;
}
/**
 * Call .detectChanges() on the change detector ref whenever this property is written to.
 * This decorator does <b>not</b> require the class to be decorated with {@link NgxDecorate}
 *
 * @param propName Property at which the change detector can be found
 * @param conf Optional configuration
 */
export declare function CdrProp(propName: PropertyKey, conf?: CdrPropConfig): PropertyDecorator;
```

## Complete - automatically complete a subject

The property can hold either a single subject or an array of subjects.

Before:

```typescript
@Component({})
export class Foo implements OnDestroy {
  private _subjects: Subject<any>[] = [];
  private _oneSubject: Subject<any>;
  
  public ngOnDestroy(): void {
    if (this._oneSubject) {
      this._oneSubject.complete();
    }
    for (const subj of this._subjects) {
      subj.complete();
    }
  }
}
```

After:

```typescript
@NgxDecorate()
@Component({})
export class Foo {
  @Complete()
  private _subjects: Subject<any>[] = [];
  @Complete()
  private _oneSubject: Subject<any>;
}
```

API:

```typescript
/**
 * Automatically completes the subjects and event emitters at this property.
 * The property can be either a single object or an array of objects.
 */
export declare function Complete(): PropertyDecorator;
```

## LazySubject - create a subject lazily

Creating subjects within a constructor on the `OnInit` hook
can sometimes be wasteful if there's a chance they won't be used.
Instantiate your subjects lazily and make sure you only allocate
resources to what you actually need! The subject will only be created
once; any further access will happen as if it were a regular property.

Code:

```typescript
@NgxDecorate()
@Component({})
export class Foo {
  
  @LazySubject()
  public get someSubject(): Subject<string> {
    return new Subject<string>();
  }
}
```

Equivalent logic:

```typescript
@Component({})
export class Foo implements OnDestroy {
  private _subjects: Subject<any>[] = [];
  
  public get someSubject(): Subject<string> {
    const value = new Subject<string>();
    this._subjects.push(value);
    Object.defineProperty(this, 'someSubject', {value});
    
    return value;
  }
  
  public ngOnDestroy(): void {
    for (const subj of this._subjects) {
      subj.complete();
    }
  }
}
```

API:

```typescript
/**
 * Decorate a getter that returns a subject. The subject will automatically get completed
 * when the component/service/pipe is destroyed.
 */
export declare function LazySubject(): MethodDecorator;
```

## SubjectSetter - mirror a property to a subject

Note: Setting the default value will **not** work if the class does not
support `OnInit` hooks, i.e. don't use the option on services and pipes.

Additionally, the option should not be used on component inputs as the input would
get overridden during the `OnInit` hook.

Before:

```typescript
@Component({})
export class Foo implements OnInit, OnDestroy {
  private _name: string;
  
  private _name$: Subject<string> = new Subject<string>();
  
  public set name(v: string) {
    this._name = v;
    this._name$.next(v);
  }
  
  public get name(): string {
    return this._name;
  }
  
  public ngOnInit(): void {
    this.name = 'foo';
  }
  
  public ngOnDestroy(): void {
    this._name$.complete();
  }
}
```

After:

```typescript
@NgxDecorate()
@Component({})
export class Foo {
  @SubjectSetter('_name$', {default: 'foo'})
  public name: string;
  
  @Complete()
  private _name$: Subject<string> = new Subject<string>();
}
```

API (see ConfEnum docs under [@CdrProp](#cdrprop---automatically-trigger-change-detection)):

```typescript
export interface SubjectSetterConfig {
    /** Default value to set on the prototype */
    default?: any;
    /** Partial property descriptor */
    desc?: ConfEnum;
}
/**
 * Mark the property as a subject setter. When written to, it will call .next(value) on the subject.
 * The decorator's <b>default</b> config option only works on items that make use of the OnInit hook,
 * i.e. it will <b>not</b> work for services and pipes.
 *
 * Because the <b>default</b> config option utilises the OnInit hook, it should not be used on
 * properties that are component inputs as the input would get overridden during the hook.
 *
 * @param subjectPropName Name of the property at which the subject resides
 * @param conf Optional configuration
 */
export declare function SubjectSetter(subjectPropName: PropertyKey, conf?: SubjectSetterConfig): PropertyDecorator;
```

## SubscribeTo - set a property's value from an observable

Effectively the opposite of `@SubjectSetter`

Before:

```typescript
@Component({})
export class Foo implements OnInit, OnDestroy {
  public prop: SomeInterface;
  private prop$: Observable<SomeInterface>;
  private _propSubscription: Subscription;
  
  public constructor(private svc: SomeService, private cdr: ChangeDetectorRef) {}
  
  public ngOnInit(): void {
    this.prop$ = this.svc.getSomeInterface();
    this._propSubscription = this.prop$.subscribe((v: SomeInterface) => {
      this.prop = v;
      this.cdr.detectChanges();
    });
  }
  
  public ngOnDestroy(): void {
    if (this._propSubscription) {
      this._propSubscription.unsubscribe();
    }
  }
}
```

After:

```typescript
@NgxDecorate()
@Component({})
export class Foo implements OnInit {
  @SubscribeTo('prop$', {cdrProp: 'cdr'})
  public prop: SomeInterface;
  
  public constructor(private svc: SomeService, private cdr: ChangeDetectorRef) {}
  
  public ngOnInit(): void {
    this.prop$ = this.svc.getSomeInterface();
  }
}
```


API:

```typescript
export interface SubscribeToConfig {
    /** Property at which the change detector resides */
    cdrProp?: PropertyKey;
}

/**
 * Subscribe to an observable and set its last emitted value to this property
 *
 * This decorator requires the ngOnInit hook and therefore will only work with directives and components.
 *
 * @param prop Property at which the observable resides
 * @param cfg Optional configuration
 */
export declare function SubscribeTo(prop: PropertyKey, cfg?: SubscribeToConfig): PropertyDecorator;
```

## TrackDestroyed - set the property to true during OnDestroy

This could potentially be used with the `@CdrProp()` decorator.

Before:

```typescript
@Component({})
export class Foo implements OnDestroy {
  private _destroyed: boolean;
  
  public ngOnDestroy(): void {
    this._destroyed = true;
  }
}
```

After:

```typescript
@NgxDecorate()
@Component({})
export class Foo {
  @TrackDestroyed()
  private _destroyed: boolean;
}
```

API:

```typescript
/** Set the given property to true when the component is destroyed */
export declare function TrackDestroyed(): PropertyDecorator;
```

## TrackInit - set the property to true during ngOnInit

Same as `@TrackDestroyed()`, but for `ngOnInit`

## Unsubscribe - automatically unsubscribe from subscriptions

This decorator is equivalent to [@Complete()](#complete---automatically-complete-a-subject),
but instead of `Subjects` it works on `Subscriptions`.
