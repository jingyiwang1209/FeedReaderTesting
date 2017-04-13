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


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        for(var i=0;i<allFeeds.length;i++){
             (function (feed){
                it('each feed should have a defined and non-empty url&name',function(){
                      expect(feed.url).not.toBeUndefined();
                      expect(feed.name).not.toBeUndefined();
                      expect(feed.url).not.toBe('');
                      expect(feed.name).not.toBe('');
                });
             })(allFeeds[i]);
        }
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu',function(){
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        var body=$('body');
        var menuIcon=$('.menu-icon-link');
        // var bodyClass=body.attr('class');
        // var bodyClassRemove=body.removeAttr('class');
        it('The menu element should be hidden by default',function(){
             expect(body.hasClass('menu-hidden')).toBe(true);
        });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('The menu should display when the menu icon is clicked',function(){
            menuIcon.trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(false);
        });

        it('The menu should disappear when the menu icon is clicked again',function(){
            menuIcon.trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries',function(){
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         var length;
         beforeEach(function(done){
            setTimeout(function(){
              loadFeed(0, done);
            },1);

         });
         it('There should be at least one entry element in the container',function(done){
             length=$('.feed .entry').length;
             expect(length).toBeGreaterThan(0);
             done();
         });
     });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection',function(){
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         var feedContent0;
         beforeEach(function(done){
            setTimeout(function(){
              loadFeed(0, function(){
                feedContent1=$('.feed').html();

                done();
               });
            },1);

         });
         it('The content should be different everytime a feed is loaded',function(done){
             loadFeed(1,function(){
                expect($('.feed').html()).not.toEqual(feedContent0);
                done();
             });

         });

     });

}());