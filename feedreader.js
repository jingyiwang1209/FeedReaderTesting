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
        var length=allFeeds.length;
        for(var i=0;i<length;i++){
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

    describe('The menu',function(){

        var body=$('body');
        var menuIcon=$('.menu-icon-link');
        it('The menu element should be hidden by default',function(){
             expect(body.hasClass('menu-hidden')).toBe(true);
        });

        it('The menu should display when the menu icon is clicked',function(){
            menuIcon.trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(false);
        });

        it('The menu should disappear when the menu icon is clicked again',function(){
            menuIcon.trigger("click");
            expect(body.hasClass('menu-hidden')).toBe(true);
        });

    });


    describe('Initial Entries',function(){
         var length;
         beforeEach(function(done){
              loadFeed(0, done);
         });
         it('There should be at least one entry element in the container',function(done){
             length=$('.feed .entry').length;
             expect(length).toBeGreaterThan(0);
             done();
         });
     });

    describe('New Feed Selection',function(){
         var feedContent0;
         beforeEach(function(done){
              loadFeed(0, function(){
                feedContent0=$('.feed').html();
                done();
               });
         });
         it('The content should be different everytime a feed is loaded',function(done){
             loadFeed(1,function(){
                expect($('.feed').html()).not.toEqual(feedContent0);
                done();
             });

         });

     });

}());
