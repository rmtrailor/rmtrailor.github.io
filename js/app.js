/**
 * Author: Rubin Trailor
 */

var data = {
    homeHTML: {
        h1: "<h1>Rubin Trailor</h1>",
        p: "<p>I'm a San Francisco-based software engineer interested in full-stack web development and data visualization.</p>",
        ulOpen: '<ul class="button-links">',
        li: {
            one: '<li><a href="mailto:contact@rubintrailor.com"><i class="fa fa-envelope"></i></a></li>',
            two: '<li><a href="https://github.com/rmtrailor"><i class="fa fa-github"></i></a></li>',
            three: '<li><a href="https://www.linkedin.com/in/rmtrailor"><i class="fa fa-linkedin-square"></i></a></li>',
        },
        ulClose: "</ul>",
    },
    aboutHTML: {
        h1: "<h1>Hello</h1>",
        bio: `<p>My name is Rubin Trailor and I'm an undergraduate
            student at the University of San Francisco. I am pursuing a
            B.Sc. degree in Computer Science and a minor in Mathematics.
            A main interest of mine is using programming as a visual medium
            for information. The fields I feel most passionate about is: data visualization and web development.
            However, my interests aren't limited there &#8211; I'm always wanting
            to learn new things, and almost every day I learn something new
            and fascinating in this field.
            </p>`
    },
    educationHTML: {
        h1: '<h1>Education</h1>',
        leftContainer: "<div class=\"left-container\"></div>",
        universityName: "<h2>University of San Francisco, San Francisco, CA</h2>",
        universityDescription: `<p>
                                    B.Sc. Computer Science Candidate <br>
                                    Mathematics Minor<br>
                                    Major GPA: 3.91<br>
                                    Expected Graduation: May 2017 <br>
                                    Dean's List: 2013, 2014, 2015, 2016
                                </p>`,
        rightContainer: "<div class=\"right-container\"></div>",
        universityImage: `<img src="images/usf-lm.JPG" alt="Picture of University of San Francisco" id="usf-picture">`
    },
    portfolioHTML: {
        h1: '<h1>Portfolio</h1>',
        projects: {
            searchEngine: {
                title: 'Search Engine',
                description: `The search engine was built using a Java backend. The program featured an inverted index and TF-IDF scoring to
                            store and rank searches. The search engine featured user support that saved
                            user information to a database. Users could: login and logoff, view and delete
                            search history, private search, and change their password. This program was a
                            five-part project for my Software Development class at USF. Therefore, the
                            repository is not public. If you wish to see the source code, I would be happy
                            to send it.`,
                img: `<img src="images/pathfinder.png" alt="Picture of Path Finder Search Engine">`
            },
            bplVisual: {
                title: 'Barclay\'s Premier League Visual Analysis',
                description: `For this project I visualized the performance of the different teams in the
                            Barclay's Premier League. The project features four visualizations that
                            analyze each team against each other based on different factors. This project used a
                            dataset that gave stats for each match in the 2015-2016 season. JavaScript
                            and D3.js were used in this project.`,
                img: `<img src="images/bpl-visual.png" alt="Picture of Barclay's Premier League Visual Analysis Visualization">`,
                links: [
                    '<a href="portfolio/premier-league-analysis/index.html">Link to Visualization</a>',
                    '<a href="https://github.com/rmtrailor/Premier-League-Visualization">Link to Repository</a>'
                ]
            },
            sfMaintenance: {
                title: 'San Francisco 311 Maintenance Call Visualization',
                description: `Visualized San Francisco 311 Tree Maintenance Calls public dataset using
                            JavaScript and D3.js. Parsed GeoJSON data to create a choropleth map of
                            San Francisco and placed color-coded symbols on the map for each maintenance
                            call. Interactive Features: Tooltips when hovering over symbols or neighborhood
                            areas, and radio buttons to filter the display of symbol groups.`,
                img: `<img src="images/tree-visualization.png" alt="Picture of San Francisco Tree Maintenance Visualization">`,
                links: [
                    '<a href="portfolio/tree-maintenance/index.html">Link to Visualization</a>',
                    '<a href="https://github.com/rmtrailor/SF-Tree-Maintenance-Calls-Visualization">Link to Repository</a>'
                ]
            },
            marketHealthIndex: {
                title: 'Market Health Index Visualization',
                description: `Visualized the Zillow's dataset on the United States Market Health Index using
                            a scatterplot matrix. Prototypes for this dataset were made using Tableau. The
                            actual scatterplot matrix was created using JavaScript and the D3.js library.`,
                img: `<img src="images/market-health-index.png" alt="Picture of Market Heatlh Index Visualization">`,
                links: [
                    '<a href="portfolio/market-health-index/index.html">Link to Visualization</a>',
                    '<a href="https://github.com/rmtrailor/Market-Health-Index-Visualization">Link to Repository</a>'
                ]
            },
            tankGame: {
                title: 'Tank Game',
                description: `A 3D action game where the player controlled a tank and destroyed other tanks while
                            trying to avoid being destroyed themselves. Featured collision detection, projectile
                            management, item pickups, and AI controller for the bot tanks. Created using C++ and
                            the OGRE graphics engine.`,
                img: `<img src="images/tank-game.PNG" alt="Picture of Tank Game">`,
                links: [
                    '<a href="https://github.com/rmtrailor/Tank-Game">Link to Repository</a>'
                ]
            }
        }
    },
    workHTML: {
        h1: '<h1>Work Experience</h1>',
        listings: {
            internship: {
                title: 'Software Engineer Intern',
                location: 'CA Technologies',
                duration: 'Dec. 2016 - Present',
                description: 'Worked on the frontend side of a web application using React and Redux. Work was focused on communication implementations with the backend of the application.'
            },
            teachingAssistant: {
                title: 'Teaching Assistant',
                location: 'University of San Francisco',
                duration: 'Aug. 2015 - Dec. 2016',
                description: `Grading, holding office hours to help students, and assistance during class periods.
                            Tutored Java and Python`
            },
            researchAssistant: {
                title: 'Research Assistant',
                location: 'University of San Francisco',
                duration: 'Dec. 2015 - Feb. 2016',
                description: `I assisted on a research project that focused on focus and context
                            visualizations. I helped develop a tablet app that tested these types of
                            visualizations using the Android SDK and then worked on a Desktop version
                            using C++.`
            }
        }
    },
};

var homeHTML = data.homeHTML;
var aboutHTML = data.aboutHTML;
var educationHTML = data.educationHTML;
var portfolioHTML = data.portfolioHTML;
var workHTML = data.workHTML;


/**
 * Replaces the currently viewed html content to fit the context of the side menu selection
 * @param  subject          The subject of the material to be placed
 * @return                        nothing
 */
var replaceContent = function(subject) {
    $('.opening-text').empty();
    $('.opening-text').removeClass('home');
    switch (subject) {  
        case 'home':
            var $h1 = $(homeHTML.h1);
            var $p = $(homeHTML.p);
            var $ul = $(homeHTML.ulOpen + homeHTML.li.one + homeHTML.li.two + homeHTML.li.three 
                + homeHTML.ulClose);

            $('.opening-text').append($h1);
            $('.opening-text').append('<hr>');
            $('.opening-text').append($p);
            $('.opening-text').append($ul);
            $('.opening-text').addClass('home');

            break;

        case 'about':
            var $div = $('<div></div>').addClass('inner-container');
            var $h1 = $(aboutHTML.h1);
            var $bio = $(aboutHTML.bio).addClass('bio');

            $div.append($h1);
            $div.append($bio);

            $('.opening-text').append($div);

            break;

        case 'education':
            var $div = $('<div></div>').addClass('inner-container').addClass('education');
            var $h1 = $(educationHTML.h1);
            var $leftContainer = $(educationHTML.leftContainer).addClass('left-container');
            var $universityName = $(educationHTML.universityName);
            var $universityDescription = $(educationHTML.universityDescription);
            var $rightContainer = $(educationHTML.rightContainer).addClass('right-container');
            var $universityImage = $(educationHTML.universityImage).attr('id', 'usf-picture');

            $div.append($h1);
            $div.append($leftContainer);
            $div.append($rightContainer);
            $leftContainer.append($universityName);
            $leftContainer.append($universityDescription);
            $rightContainer.append($universityImage);

            $('.opening-text').append($div);

            break;

        case 'portfolio':
            var $div = $('<div></div>').addClass('inner-container');
            var $h1 = $(portfolioHTML.h1);

            $div.append($h1);

            for (var proj in portfolioHTML.projects) {
                var project = portfolioHTML.projects[proj];
                var $innerDiv = $('<div></div>').addClass('project-container');
                var $leftContainer = $('<div></div>').addClass('left-container');
                var $rightContainer = $('<div></div>').addClass('right-container');
                var $title = $('<h2>' + project.title + '</h2>');
                var $description = $('<p>' + project.description + '</p>');
                var $img = $(project.img);

                $innerDiv.append($leftContainer);
                $innerDiv.append($rightContainer);
                $rightContainer.append($title);
                $rightContainer.append('<hr>');
                $rightContainer.append($description);

                if (project.links !== undefined) {
                    for (var i = 0; i < project.links.length; i++) {
                        var $link = $(project.links[i]);
                        $rightContainer.append($link);
                    }
                }

                $leftContainer.append($img);
                $div.append($innerDiv);
                $div.append('<hr>');
            }

            $('.opening-text').append($div);

            break;

        case 'work':
            var $div = $('<div></div>').addClass('inner-container');
            var $h1 = $(workHTML.h1);

            $div.append($h1);

            for (var job in workHTML.listings) {
                var work = workHTML.listings[job];
                var $innerDiv = $('<div></div>').addClass('work-container');
                var subtext = '<span> &#8211; ' + work.location + ' ' + '(' + work.duration + ')' + '</span';
                var $title = $('<h2>' + work.title + ' ' + subtext + '</h2>');
                var $description = $('<p>' + work.description + '</p>');

                $innerDiv.append($title);
                $innerDiv.append($description);
                $div.append($innerDiv);
            }

            $('.opening-text').append($div);

            break;
    }

    slideMenu('close', 600);
    $('.opening-text').fadeIn(1500, 0);
};

/**
 * Reveals or hides the side menu
 * @param  direction    open -> reveal; closed -> hide
 * @param  time         how long to move the menu
 * @return              nothing
 */
function slideMenu(direction, time) {
    var removingClass, addingClass, removingIcon, addingIcon, menuLeft, containerLeft;

    if (time === undefined) time = 200;

    if (direction === "open") {
        removingClass = 'open';
        addingClass = 'closed';
        removingIcon = 'fa-bars';
        addingIcon = 'fa-close';
        menuLeft = '0%';
        // containerLeft = '20%';
        containerLeft = parseInt($('.menu').css('width'));
    } else {
        removingClass = 'closed';
        addingClass = 'open';
        removingIcon = 'fa-close';
        addingIcon = 'fa-bars';
        // menuLeft = '-20%';
        menuLeft = -1 * parseInt($('.menu').css('width'));
        console.log(menuLeft);
        containerLeft = '0%';
    }

    $('.icon').removeClass(removingClass).addClass(addingClass);
    $('.icon i').removeClass(removingIcon).addClass(addingIcon);

    $('.menu').animate({
        'left': menuLeft
    }, time);

    $('.opening-container').animate({
        'left': containerLeft
    }, time);

}

var main = function() {
    
    $('.opening-text').fadeIn(2500, 0);
    $('.icon').fadeIn(2500, 0);

    $('.icon').click(function() {

        if ($('.icon').hasClass('open')) {
            slideMenu('open', 200);
        } else {
            slideMenu('close', 200); 
        }

    });

    /**
     * Hover functionality
     *
     * Used this instead of "a:hover" to make the color faid in and out for a smoother
     * effect
     */

    $('.menu ul li').mouseover(function() {
        $(this).css({ "color": "#4582EC" });
    });

    $('.menu ul li').mouseout(function() {
        $(this).css({ color: "#FFF" });
    });

    // $('.opening-text ul li a').mouseover(function() {
    //     $(this).css({ "font-size": "255%", "color": "#EEE" });
    // })

    // $('.opening-text ul li a').mouseout(function() {
    //     $(this).css({ "font-size": "250%", "color": "#FFF" });
    // })

    $('#resume-button').mouseover(function() {
        $(this).css({ "color": "#4582EC" });
    })

    $('#resume-button').mouseout(function() {
        $(this).css({ "color": "#FFF" });
    })

    $('.icon').mouseover(function() {
        $(this).css({ "font-size": "260%", "color": "#EEE" });
    })

    $('.icon').mouseout(function() {
        $(this).css({ "font-size": "250%", "color": "#FFF" });
    })

    /**
     * Click functionality
     */

    $('#home-link').click(function() {
        $('.opening-text').fadeOut(1000, 0, function() {
            replaceContent('home');
        });
    });

    $('#about-link').click(function() {
        $('.opening-text').fadeOut(1000, 0, function() {
            replaceContent('about');
        })
    })

    $('#education-link').click(function() {
        $('.opening-text').fadeOut(1000, 0, function() {
            replaceContent('education');
        })
    })

    $('#portfolio-link').click(function() {
        $('.opening-text').fadeOut(1000, 0, function() {
            replaceContent('portfolio');
        })
    })

    $('#work-link').click(function() {
        $('.opening-text').fadeOut(1000, 0, function() {
            replaceContent('work');
        })
    })
}

$(document).ready(function() {    
    main();
});