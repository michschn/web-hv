var ghpages = require('gh-pages');

ghpages.publish('build', (err) => {
    if (err) {
        console.error('Deploy failed!', err)
    } else {
        console.log('Deploy Complete!')
    }
});