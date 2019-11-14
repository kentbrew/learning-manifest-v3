# Testing Extensions on Chrome Canary
###### Kent Brewster, 2019-11-13. For fastest contact, Twitter is your best bet; I'm [@kentbrew](https://twitter.com/kentbrew) there and everywhere else that hasn't already kicked me off.

Problem: all the cool new toys only work in Chrome Canary.  If you're like me, your chrome://extensions page is already a giant mass of internally-conflicting test extensions and you dislike the taste of coal dust, so you've avoided Canary versions of Chrome at all costs.

Here's how to get Chrome Canary running in parallel with production Chrome, without crossing the streams or getting Canary's peanut butter in your chocolate. (Yes, sorry, these instructions are OSX-centric; pull requests for this or any other issue will be gratefully accepted.)

## Download and install

Start here:

https://www.google.com/chrome/canary/

Install Chrome Canary. It should not wipe your existing copy of Chrome; when you open a Terminal window and do this:

````
cd /Applications
ls "Google Chrome*"
````

... you should see something like this:

````
Google Chrome Canary.app:
Contents/

Google Chrome.app:
Contents/
````

## Make a developer profile

In Terminal, still in `/Applications`, start Chrome Canary with a blank profile:

````
open -a "Google Chrome Canary" --args --user-data-dir=/dev/null
````

Chrome Canary should come up with a new profile. Click the three-dot menu (top right) and start a new profile (mine is Canary Boy, with the little red bird default icon) and switch to it. 

## Save it for later 

In your taskbar, right-click the yellow Chrome icon and choose Keep In Dock.  The icon should slide over to the permanent residents of your dock.

## Test whether it worked

Close Chrome Canary and your production Chrome, then open them back up.  You ought to have two separate windows, signed in to Chrome as two different people.  

From here on in you should be able to test Manifest V3 and other features on Canary, without worrying about whether you're hosing your production copy of Chrome.  When you drag your test extension into chrome://extensions in Canary it should not be there in production, and vice versa.  




