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
