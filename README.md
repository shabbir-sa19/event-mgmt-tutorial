# Event Manegment Web App

## This is a full stack web application for a full scale Event management system

## User accounts

New accounts are employees by default. User IDs are generated automatically, and a user can sign in with their user ID, email address, or mobile number. Mobile numbers must use international format (for example, `+14155552671`). Signed-in users can update their name and mobile number from **Dashboard → My Profile**; the user ID and role are not editable from the profile.

Administrators can access the management sections in the dashboard. To bootstrap an administrator account, set `ADMIN_EMAILS` to a comma-separated list of email addresses before those accounts sign up. Role assignment is server-controlled and is not available in public signup or profile updates. Existing accounts can be promoted by an authorized database operator by setting their Better Auth user document's `role` field to `"admin"`.
