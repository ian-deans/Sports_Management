state:
-app
  -authenticated
  -loading
  -user
  -contexts
-account
  -household_data
  -household_members
  -saved_payment_methods
  -payment_history
  -[documents]
-hq
  -organization_data
    -business_details
    -legal_representative
    -proof_of_id
    -bank_information
    -payment_method
    -administrators
  -[affiliated_households]
  -current_household
    -data
    -[members]
    -order_history
    -[documents]
  -[registrations]


resources:
-users
-contexts
-people
-ogranizations
-programs
-registrations
-payment_methods
-ui

