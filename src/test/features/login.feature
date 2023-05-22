Feature: User Authentication tests

Background:
  Given user navigates to the application
  And User click on the login link

Scenario: Login invalid
And user enter the email as "bad@example.com"
And user enter the password as "badpassword"
When user click on sign in button
Then error displayed as "The email or password is incorrect."

Scenario: Login valid
And user enter the email as "adrian+1004930927@nexudus.com"
And user enter the password as "i0i1lgVD8OK8"
When user click on sign in button
Then you successfully land on Kalkio Space - East Side homepage

Scenario: Add and delete a product from the products list
And user enter the email as "adrian+1004930927@nexudus.com"
And user enter the password as "i0i1lgVD8OK8"
When user click on sign in button
And navigate to Inventry link on left panel
And I click on Add product
And click on Manual entry
And I add 'name' 'description' 'price' 'position of the product'
And I Click on Save changes
Then I see new added product displayed on top of the product list
When I click on the new added product
And Click on delete
And confirm the pop up message Yes
Then I see new added product is not displayed on the product list