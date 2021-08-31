# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.12] - 2021-08-31

### Fixed

- Fix Typos on SBX and PROD workflows

## [0.7.11] - 2021-08-31

### Fixed

- Update SBX workflow environment variables

## [0.7.10] - 2021-08-26

### Added

- S3/Cloudfront deployment

## [0.7.9] - 2021-07-13

### Added

- Add SANDBOX workflow

### Fixed

- Include yarn.lock in docker build

## [0.7.8] - 2021-06-29

### Fixed

- Fixed values readability

## [0.7.7] - 2021-06-29

### Fixed

- Node and sass versions

## [0.7.6] - 2021-06-28

### Fixed

- Leaf value decoding

## [0.7.5] - 2021-06-17

### Fixed

- Truncation of values lower than one

## [0.7.4] - 2021-06-10

### Changed

- Reposition timestamp on L2D and FCD sections and improve readability

## [0.7.3] - 2021-06-10

### Added

- L2D page and Leaf details on Block modal now display pair timestamps

## [0.7.2] - 2021-06-10

### Added

- FCD page now displays pair timestamps

## [0.7.1] - 2021-06-08

### Fixed

- URL filters

## [0.7.0] - 2021-05-25

### Changed

- FCD are no longer stored for every block but updated on new blocks
- Update Block view to encompass changes on back-end
- Rework API requests to match back-end changes
- Update mocks to match changes
- Improve encoding/decoding methods
- Update toolbox to encompass encoding/decoding changes

## [0.6.4] - 2021-05-10

### Added

- Update Makefile

## [0.6.3] - 2021-05-07

### Fixed

- Update Makefile

## [0.6.2] - 2021-05-03

### Fixed

- GitOps Action

## [0.6.1] - 2021-05-03

### Added

- Add new Production git workflow

## [0.6.0] - 2021-04-30

### Added

- Dynamic URL for searchable pages
- Display number of leaves on block page and layer 2 data page
- New prod release process

### Fixed

- Workflow execution event

## [0.5.0] - 2021-04-27

### Added

- Search layer 2 data keys on block page
- Makefile for new dev env

## [0.4.0] - 2021-04-08

### Added

- Add chain address to block info card

## [0.3.0] - 2021-04-01

### Added

- Fetch chain contract address from API

### Changed

- Search bar styling and functionalities

## [0.2.0] - 2021-03-19

### Added

- Key search to Layer 2 and First Class Data pages
- Added age property to Block page

### Changed

- Updated blocks age property to match Etherscan age system

### Fixed

- Update cache settings using nginx.conf

## [0.1.1] - 2021-03-15

### Changed

- Hide invalid timestamps

## [0.1.0] - 2021-03-09

### Added

- Initial version - repository migration
- CI/CD
- First class data page

### Changed

- FCD values are now fetched from the API instead of the contract
- Bumped @umb-network/toolbox version
- Data nomenclature
- Layer 2 mobile table styling on block show page
- Format block Age and timestamp
