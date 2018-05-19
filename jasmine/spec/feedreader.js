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
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("have URLs", function() {
            allFeeds.forEach(function(array) {
                var urls = array.url;
                expect(urls).not.toBe("");
                expect(urls).toContain("http" && "://" && "feed" && ".");
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("have names", function() {
            allFeeds.forEach(function(array) {
                var names = array.name;
                expect(names).not.toBe("");
            });
        });
    });


    /* This test suite is about menu element
     * state and how that is change on click
     */
    describe("The menu", function() {

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it("is hidden", function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: menu on when
          * clicked and menu off when clicked again.
          */
        it("was toggled on/off", function() {
            // menu on
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(false);
            // menu off
            $(".menu-icon-link").trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });


    describe("Initial Entries", function() {

        /* Test that ensures when the loadFeed function
         * is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it("at least one exist", function(done) {
            expect($(".feed .entry").length).not.toBe(0);
            done();
        });
    });


    describe("New Feed Selection", function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                oldFeed = $(".feed").html();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it("content is changed", function(done) {
            expect($(".feed").html()).not.toBe(oldFeed);
            done();
        });
    });
}());
