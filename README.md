[![NpmVersion](https://img.shields.io/npm/v/ngx-decorate.svg?style=flat-square)](https://www.npmjs.com/package/ngx-decorate)
[![Travis (.com) branch](https://img.shields.io/travis/com/Alorel/ngx-decorators/1.1.2.svg?style=flat-square)](https://travis-ci.com/Alorel/ngx-decorators)
[![Coveralls github branch](https://img.shields.io/coveralls/github/Alorel/ngx-decorators/1.1.2.svg?style=flat-square)](https://coveralls.io/github/Alorel/ngx-decorators)
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
- [Usage (common)](#usage-common)
- [Decorators](#decorators)
  - [CdrProp - automatically trigger change detection](#cdrprop---automatically-trigger-change-detection)
  - [Complete - automatically complete a subject](#complete---automatically-complete-a-subject)
  - [LazySubject - create a subject lazily](#lazysubject---create-a-subject-lazily)
  - [SubjectSetter - mirror a property to a subject](#subjectsetter---mirror-a-property-to-a-subject)
  - [TrackDestroyed - set the property to true during OnDestroy](#trackdestroyed---set-the-property-to-true-during-ondestroy)
  - [TrackInit - set the property to true during ngOnInit](#trackinit---set-the-property-to-true-during-ngoninit)
  - [Unsubscribe - automatically unsubscribe from subscriptions](#unsubscribe---automatically-unsubscribe-from-subscriptions)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

```bash
npm install ngx-decorate
```

# Basic principle

Angular apps have a lot of repetitive code - completing subjects, unsubscribing, triggering change detection etc.
This library hooks into a component's `OnInit` and `OnDestroy` hooks and does all the magic for you.
If your component already has an `OnInit` or `OnDestroy` hook, it will still be called. 

# Usage (common)

Unless otherwise specified in the decorator's documentation, if you use any of the decorators, you must
also decorate the class with `NgxDecorate()` to register the `OnInit` and `OnDestroy` hooks:

```typescript
import {NgxDecorate} from 'ngx-decorate';

@NgxDecorate()
@Component({})
export class Foo {}
```

At the moment of writing, only `@CdrProp()` doesn't require this, however, please refer to the code docs
for the most up-to-date information.

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
