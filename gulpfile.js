const gulp = require('gulp');
const RSS = require('rss');
const path = require('path');
const fs = require('fs');

const BUILD_SRC = path.join(__dirname, 'build');

gulp.task('build-rss', function(done) {
    const rssConfig = require('./config/rssConfig.json');
    const items = require('./config/feed.js');

    const feed = items.reduce((rssFeed, item) => {
        rssFeed.item(Object.assign(item, rssConfig.itemDefaults));

        return rssFeed;
    }, new RSS(rssConfig.feed));

    const xmlString = feed.xml({indent: true});

    fs.writeFile(path.join(BUILD_SRC, 'feed.xml'), xmlString, function(err) {
        done(err);
    });
});

gulp.task('build-blog', ['build-rss']);
