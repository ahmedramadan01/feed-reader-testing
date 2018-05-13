/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('url is not empty',function(){
           for (feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /*a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('name is defined',function(){
           for (feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /*a new test suite named "The menu" */
    describe('The menu',function(){
      var menuIcon = $('.menu-icon-link');
      function clicked(){
        $('body').toggleClass('menu-hidden');
      }

      function clickedagain(){
        $('body').toggleClass('menu-hidden');
      }
      menuIcon.first= function(){
        clicked();
      }
      menuIcon.second= function(){
        clickedagain();
      }



      /*a test that ensures the menu element is
       * hidden by default. .
       */
      it('bodyHasClassmenu-hidden',function(){
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });
      it('menuChangedVisibility',function(){
        menuIcon.first();
        expect($('body').hasClass('menu-hidden')).not.toBe(true);
        menuIcon.second();
        expect($('body').hasClass('menu-hidden')).toBe(true);
      });

});


         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

    /* a test suite named "Initial Entries" */
    describe('InitialEntries',function(){
      beforeEach(function(done){
          window.loadFeed(0,function(){
            done();
          });
      });

      /*a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
      it('ensureAtLeatOneElementInFeed',function(done){
        var ele=$('.feed');
        var value= ele[0].childNodes.length;
        expect(value).toBeGreaterThan(0);
        done();
      });
    });

    describe('New Feed Selection',function(){
           beforeEach(function(done){
               window.loadFeed(0,function(){
                    prevUrl= $('.feed').html();
                 window.loadFeed(1,function(){
                    newUrl= $('.feed').html();
                    done();
                 });
               });
           });

           /* a test that ensures when a new feed is loaded
            * by the loadFeed function that the content actually changes.
            * Remember
            */
           it('contentChanged',function(){
             expect(prevUrl).not.toBe(newUrl);
           });
         });

}());
