# TODO: Make Date of Retirement editable in Profile component

## Plan Steps

- [x] Analyze the issue (read `src/Pages/Profile.js`)
- [x] Search related files (`Dashboard.js`, `Signup.js`) for `dateOfRetirement` usage
- [x] Present plan & get user approval
- [x] Edit form state init: `dateOfRetirement: 'N/A'` -> `''`
- [x] Edit data loading: convert stored retirement date to `YYYY-MM-DD`
- [x] Edit JSX: replace read-only `<div>` with editable `<input type="date">`
- [x] Edit save payload: include `dateOfRetirement` in the axios PUT body
- [x] Verify build/lint (no errors)

