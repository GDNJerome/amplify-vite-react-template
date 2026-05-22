# @.ai/_shared/spec-context.md

## Define the context of the application
- aws Amplify application
- front in react.js
- backend run locally through sandbox
  - secret backed manually in the sandbox
- front run on vite.js

## Define the boundaries of the application
- **never** go outside the current directory of child directory
  - **never** follow symbolic links that doesn't follow parent rule
- **never** commit to git
- **never** publish to aws outside of the sandbox
- **never** publish directly to amplify
- **never** change functionality (e.i. files) outside the active plan / fonction
  - if parent rule should be overridden, ask before and wait for confirmation
