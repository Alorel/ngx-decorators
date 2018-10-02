## [3.0.2](https://github.com/Alorel/ngx-decorators/compare/3.0.1...3.0.2) (2018-10-02)


### Bug Fixes

* Fix errors caused by some Symbol polyfills & IE11 erroring out when 'name' is defined on a function. ([ea7d2c2](https://github.com/Alorel/ngx-decorators/commit/ea7d2c2))

## [3.0.1](https://github.com/Alorel/ngx-decorators/compare/3.0.0...3.0.1) (2018-09-26)


### Documentation

* Add class inheritance notice ([f416944](https://github.com/Alorel/ngx-decorators/commit/f416944))

# [3.0.0](https://github.com/Alorel/ngx-decorators/compare/2.0.4...3.0.0) (2018-09-26)


### Maintenance

* **package:** Update chai & ts-loader ([37fa35f](https://github.com/Alorel/ngx-decorators/commit/37fa35f))
* **package:** Update tslint-rules ([b9e6445](https://github.com/Alorel/ngx-decorators/commit/b9e6445))


### Performance Improvements

* Refactor the code to use ChangeDetectorRef's `markForCheck()` method instead of `detectChanges()` ([bcab7a3](https://github.com/Alorel/ngx-decorators/commit/bcab7a3))


### BREAKING CHANGES

* The library now uses the ChangeDetectorRef's `markForCheck()` method instead of `detectChanges()`. This would break your code **only** if you were somehow relying on the change detection to be synchronous, which very rarely the case.

## [2.0.4](https://github.com/Alorel/ngx-decorators/compare/2.0.3...2.0.4) (2018-09-07)


### Documentation

* **README:** Add link to ngx-decorate-preprocessor ([73c5deb](https://github.com/Alorel/ngx-decorators/commit/73c5deb))

## [2.0.3](https://github.com/Alorel/ngx-decorators/compare/2.0.2...2.0.3) (2018-09-07)


### Bug Fixes

* **build:** Pushed dist files should now be handled properly ([#20](https://github.com/Alorel/ngx-decorators/issues/20)) ([e5368bf](https://github.com/Alorel/ngx-decorators/commit/e5368bf))

## [2.0.2](https://github.com/Alorel/ngx-decorators/compare/2.0.1...2.0.2) (2018-09-07)


### Bug Fixes

* **build:** Make `[@semantic-release](https://github.com/semantic-release)/npm` update root README.md ([6ce995a](https://github.com/Alorel/ngx-decorators/commit/6ce995a))


### Documentation

* Fixed `ngOnit` to `ngOnInit` ([3affeae](https://github.com/Alorel/ngx-decorators/commit/3affeae))

## [2.0.1](https://github.com/Alorel/ngx-decorators/compare/2.0.0...2.0.1) (2018-09-07)


### Bug Fixes

* **package:** Remove actual NgxDecorate file ([fc332d8](https://github.com/Alorel/ngx-decorators/commit/fc332d8))


### Documentation

* **CdrProp:** Remove reference to NgxDecorate ([c42014a](https://github.com/Alorel/ngx-decorators/commit/c42014a))

# [2.0.0](https://github.com/Alorel/ngx-decorators/compare/1.2.4...2.0.0) (2018-09-07)


### Documentation

* Refresh README ([e2a0572](https://github.com/Alorel/ngx-decorators/commit/e2a0572))


### Maintenance

* **package:** Set tslib as a peer dependency ([1446d23](https://github.com/Alorel/ngx-decorators/commit/1446d23))


### Refactoring

* Remove the need for the NgxDecorate ([4488926](https://github.com/Alorel/ngx-decorators/commit/4488926))


### BREAKING CHANGES

* **package:** New peer dependency: `tslib@^1.6.0`
* The NgxDecorate decorator has been removed and is no longer needed.

## [1.2.4](https://github.com/Alorel/ngx-decorators/compare/1.2.3...1.2.4) (2018-09-05)


### Maintenance

* Run tslint --fix for updated rules ([38fe75a](https://github.com/Alorel/ngx-decorators/commit/38fe75a))
* **package:** Clean up dist and package.json ([b6bb455](https://github.com/Alorel/ngx-decorators/commit/b6bb455))

## [1.2.3](https://github.com/Alorel/ngx-decorators/compare/1.2.2...1.2.3) (2018-08-20)


### Bug Fixes

* **package:** Add prepare-gpg-key.sh to npmignore ([a8c820b](https://github.com/Alorel/ngx-decorators/commit/a8c820b))


### Maintenance

* **package:** Updated dependencies ([ab7a330](https://github.com/Alorel/ngx-decorators/commit/ab7a330))

## [1.2.2](https://github.com/Alorel/ngx-decorators/compare/1.2.1...1.2.2) (2018-08-20)


### Bug Fixes

* **SubscribeTo:** Added a ngOnInit note to the TSDoc of the decorator. ([5ca3507](https://github.com/Alorel/ngx-decorators/commit/5ca3507))

## [1.2.1](https://github.com/Alorel/ngx-decorators/compare/1.2.0...1.2.1) (2018-08-19)


### Bug Fixes

* **changelog:** rm duplicate changelog entry for SubscribeTo ([c691d3d](https://github.com/Alorel/ngx-decorators/commit/c691d3d))

# [1.2.0](https://github.com/Alorel/ngx-decorators/compare/1.1.2...1.2.0) (2018-08-19)


### Dependency updates

* **package:** update [@alorel-personal](https://github.com/alorel-personal)/conventional-changelog-alorel to version 2.0.2 ([6d42e4a](https://github.com/Alorel/ngx-decorators/commit/6d42e4a))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/semantic-release to version 1.3.0 ([6ebcbf8](https://github.com/Alorel/ngx-decorators/commit/6ebcbf8))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/semantic-release to version 1.3.0 ([3667123](https://github.com/Alorel/ngx-decorators/commit/3667123))
* **package:** update typedoc to version 0.12.0 ([c303f9a](https://github.com/Alorel/ngx-decorators/commit/c303f9a))


### Documentation

* Add CDN link ([43c18df](https://github.com/Alorel/ngx-decorators/commit/43c18df))


### Features

* SubscribeTo decorator ([8586a2d](https://github.com/Alorel/ngx-decorators/commit/8586a2d))


### Refactoring

* **internal:** Abstracted Complete and Unsubscribe decorators ([4125440](https://github.com/Alorel/ngx-decorators/commit/4125440))
* **internal:** ensureSymbol is now typed ([2384e87](https://github.com/Alorel/ngx-decorators/commit/2384e87))
* **internal:** let -> const in subscribeTo processor ([ad881e7](https://github.com/Alorel/ngx-decorators/commit/ad881e7))

## [1.1.2](https://github.com/Alorel/ngx-decorators/compare/1.1.1...1.1.2) (2018-08-17)


### Bug Fixes

* **package:** Add yarn.lock to npmignore ([4fdd450](https://github.com/Alorel/ngx-decorators/commit/4fdd450))


### Maintenance

* Add .releaserc.yml to npmignore ([edf3766](https://github.com/Alorel/ngx-decorators/commit/edf3766))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/conventional-changelog-alorel to version 2.0.0 ([bb52695](https://github.com/Alorel/ngx-decorators/commit/bb52695))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/conventional-changelog-alorel to version 2.0.1 ([8088b19](https://github.com/Alorel/ngx-decorators/commit/8088b19))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/tslint-rules to version 1.2.2 ([5e74613](https://github.com/Alorel/ngx-decorators/commit/5e74613))


### Tests

* **package:** Generate tests asynchronously ([052b18c](https://github.com/Alorel/ngx-decorators/commit/052b18c))
* **package:** Increase timeout for build stage ([9c54622](https://github.com/Alorel/ngx-decorators/commit/9c54622))

## [1.1.1](https://github.com/Alorel/ngx-decorators/compare/1.1.0...1.1.1) (2018-08-14)


### Bug Fixes

* **defineImmutable:** Require prop to be of type PropertyKey ([93ccc06](https://github.com/Alorel/ngx-decorators/commit/93ccc06))
* **duplication:** Removed duplicated code in TrackDestroyed and TrackInit ([62b04af](https://github.com/Alorel/ngx-decorators/commit/62b04af))


### Build System

* Don't run release stage on tags ([b2e6e39](https://github.com/Alorel/ngx-decorators/commit/b2e6e39))

# [1.1.0](https://github.com/Alorel/ngx-decorators/compare/1.0.8...1.1.0) (2018-08-14)


### Features

* TrackInit decorator ([2bbf0a1](https://github.com/Alorel/ngx-decorators/commit/2bbf0a1))


### Maintenance

* **package:** Update dev dependencies ([d8c470f](https://github.com/Alorel/ngx-decorators/commit/d8c470f))


### Refactoring

* **NgxDecorate:** Moved destroyed setter into try block ([3cc04a2](https://github.com/Alorel/ngx-decorators/commit/3cc04a2))
* **package:** tslib is no longer a peer dependency; exports refactored to no longer require tslib. ([77e6893](https://github.com/Alorel/ngx-decorators/commit/77e6893))

## [1.0.8](https://github.com/Alorel/ngx-decorators/compare/1.0.7...1.0.8) (2018-08-14)


### Bug Fixes

* **docs:** Fixed the documentation link ([a76c0ee](https://github.com/Alorel/ngx-decorators/commit/a76c0ee))

## [1.0.7](https://github.com/Alorel/ngx-decorators/compare/1.0.6...1.0.7) (2018-08-10)


### Bug Fixes

* **TrackDestroyed:** Property is now set before the existing ngOnDestroy ([2b241d5](https://github.com/Alorel/ngx-decorators/commit/2b241d5))


### Maintenance

* **package:** update [@alorel-personal](https://github.com/alorel-personal)/semantic-release to version 1.2.2 ([7639749](https://github.com/Alorel/ngx-decorators/commit/7639749))

## [1.0.6](https://github.com/Alorel/ngx-decorators/compare/1.0.5...1.0.6) (2018-08-10)


### Bug Fixes

* **package:** Add package keywords ([41df212](https://github.com/Alorel/ngx-decorators/commit/41df212))


### Maintenance

* Add internal doc flag to decorator helpers ([e0bd162](https://github.com/Alorel/ngx-decorators/commit/e0bd162))


### Refactoring

* **Complete:** Reduce code desting level ([4e077b6](https://github.com/Alorel/ngx-decorators/commit/4e077b6))
* **NgxDecorate:** Reduce nesting level ([f621a4a](https://github.com/Alorel/ngx-decorators/commit/f621a4a))
* **Unsubscribe:** Reduce code nesting level ([f39bed3](https://github.com/Alorel/ngx-decorators/commit/f39bed3))

## [1.0.5](https://github.com/Alorel/ngx-decorators/compare/1.0.4...1.0.5) (2018-08-09)


### Bug Fixes

* **CI:** Add on:tags:true to travis deploy ([9ca84c6](https://github.com/Alorel/ngx-decorators/commit/9ca84c6))

## [1.0.4](https://github.com/Alorel/ngx-decorators/compare/1.0.3...1.0.4) (2018-08-09)


### Bug Fixes

* **CI:** Add all_branches to deploy config ([334ef23](https://github.com/Alorel/ngx-decorators/commit/334ef23))

## [1.0.3](https://github.com/Alorel/ngx-decorators/compare/1.0.2...1.0.3) (2018-08-09)


### Bug Fixes

* **CI:** GH-pages release script ([cdc6f8a](https://github.com/Alorel/ngx-decorators/commit/cdc6f8a))


### Build System

* Remove docs dir before tsdoc ([64d77dc](https://github.com/Alorel/ngx-decorators/commit/64d77dc))

## [1.0.2](https://github.com/Alorel/ngx-decorators/compare/1.0.1...1.0.2) (2018-08-09)


### Bug Fixes

* **readme:** Fixed the TSDoc link ([f18f1f7](https://github.com/Alorel/ngx-decorators/commit/f18f1f7))

## [1.0.1](https://github.com/Alorel/ngx-decorators/compare/1.0.0...1.0.1) (2018-08-09)


### Bug Fixes

* **CI:** Github pages release config ([a1c91f8](https://github.com/Alorel/ngx-decorators/commit/a1c91f8))


### Maintenance

* **package:** Update [@alorel-personal](https://github.com/alorel-personal)/semantic-release ([5d5b0f8](https://github.com/Alorel/ngx-decorators/commit/5d5b0f8))

# 1.0.0 (2018-08-09)


### Bug Fixes

* LazySubject is now exported from index.ts ([fd4c25a](https://github.com/Alorel/ngx-decorators/commit/fd4c25a))
* **CdrProp:** propName type is now PropertyKey ([e6171c1](https://github.com/Alorel/ngx-decorators/commit/e6171c1))
* **CI:** release stage name ([f5c4468](https://github.com/Alorel/ngx-decorators/commit/f5c4468))
* **package:** Move doctoc to dev dependencies ([33324bd](https://github.com/Alorel/ngx-decorators/commit/33324bd))


### Build System

* CommonJS and ESM5 is now transpiled ([c0e5fbd](https://github.com/Alorel/ngx-decorators/commit/c0e5fbd))
* Create tsdoc ([50fd162](https://github.com/Alorel/ngx-decorators/commit/50fd162))
* fix TS_NODE_CACHE_DIR ([24ad9b3](https://github.com/Alorel/ngx-decorators/commit/24ad9b3))
* generate tsdocs and remove empty .d.ts outputs ([3f28894](https://github.com/Alorel/ngx-decorators/commit/3f28894))
* Move to yarn, prepare semantic-release ([b25edc7](https://github.com/Alorel/ngx-decorators/commit/b25edc7))
* Restrict release stage to pushes ([1eb71b6](https://github.com/Alorel/ngx-decorators/commit/1eb71b6))


### Documentation

* **CdrProp:** Elaborated on the destroyed config option ([bb55b6c](https://github.com/Alorel/ngx-decorators/commit/bb55b6c))
* **readme:** add Greenkeeper badge ([7470faa](https://github.com/Alorel/ngx-decorators/commit/7470faa))
* **README:** Add documentation to README ([aecb152](https://github.com/Alorel/ngx-decorators/commit/aecb152))
* **SubjectSetter:** Add usage gotchas ([a1446e7](https://github.com/Alorel/ngx-decorators/commit/a1446e7))


### Features

* **CdrProp:** CdrProp initial implementation ([b76f7c2](https://github.com/Alorel/ngx-decorators/commit/b76f7c2))
* Complete() decorator ([0b80bcf](https://github.com/Alorel/ngx-decorators/commit/0b80bcf))
* LazySubject() decorator ([67dc27e](https://github.com/Alorel/ngx-decorators/commit/67dc27e))
* SubjectSetter() decorator ([7afed9a](https://github.com/Alorel/ngx-decorators/commit/7afed9a))
* TrackDestroyed() decorator ([7b17bcc](https://github.com/Alorel/ngx-decorators/commit/7b17bcc))
* Unsubscribe() decorator implemented. ([5fee9af](https://github.com/Alorel/ngx-decorators/commit/5fee9af))


### Maintenance

* **package:** Add npmignore ([010e767](https://github.com/Alorel/ngx-decorators/commit/010e767))
* **package:** Add tslib as peer dependency ([86c3a3a](https://github.com/Alorel/ngx-decorators/commit/86c3a3a))
* Repackage ([08dfd25](https://github.com/Alorel/ngx-decorators/commit/08dfd25))
* **package:** Bump version ([1c8c49f](https://github.com/Alorel/ngx-decorators/commit/1c8c49f))
* **package:** Lock tslint rules dependency version ([61d8a1e](https://github.com/Alorel/ngx-decorators/commit/61d8a1e))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/tslint-rules to version 1.2.0 ([0188e2d](https://github.com/Alorel/ngx-decorators/commit/0188e2d))
* **package:** update [@alorel-personal](https://github.com/alorel-personal)/tslint-rules to version 1.2.1 ([b627e4f](https://github.com/Alorel/ngx-decorators/commit/b627e4f))


### Refactoring

* Move ensureSymbol to separate file ([4f6e0aa](https://github.com/Alorel/ngx-decorators/commit/4f6e0aa))
* Rename main decorator to NgxDecorate ([510c3b5](https://github.com/Alorel/ngx-decorators/commit/510c3b5))
