// https://a0.awsstatic.com/s_code/js/1.0/awshome_s_code.js
/*!
 * awshome_appM1.js
 */
var aws_sc = {
    // Set to 'dev' while the SiteCatalyst implementation is being developed or tested
    mode: 'production',

    // Used to record AWS's SiteCat s_code version number for tracking purposes
    // To be modified by web analytics team personnel only
    awsSCVersion: 'ver. 2.0.8',

    visitorNamespace: 'amazonwebservices',
    trackingServer: 'amazonwebservices.d2.sc.omtrdc.net',
    registrationStatus: '',
    munchkinID: '',
    isFromConsole: false,

    // Report suite IDs
    reportSuites: {
        DEV: 'awsamazonalldev2',
        PROD: 'awsamazonallprod1',
    },

    // Link href's and corresponding plugins for custom link tracking
    links: [
        { lhref: 'portal.aws.amazon.com/gp/aws/manageyouraccount', pluginName: 'initRegistration' },
        { lhref: 'console.aws.amazon.com', pluginName: 'initRegistration' },
        { lhref: 'portal.aws.amazon.com', pluginName: 'initRegistration' },
        { lhref: 'signin.aws.amazon.com', pluginName: 'initRegistration' },
        { lhref: 'aws.amazon.com/support/', pluginName: 'initRegistration' },
        {
            lhref: 'aws.amazon.com/gp/aws/developer/registration/index',
            pluginName: 'initRegistration',
        },
        { lhref: 'aws.amazon.com/gp/aws/developer/account/index', pluginName: 'initRegistration' },
        { lhref: 'docs.aws.amazon.com', pluginName: 'htmlDocumentHandler' },
    ],

    // Domains that are managed by this s_code.js file
    // TODO: Change this to an array or a hash so they can be referenced by shortnames (ie: "training")
    awsPublicDomains:
        'aws.amazon.com,aws.amazon.com.,aws-portal.amazon.com,amazonwebservices.com,docs.aws.amazon.com,elasticbeanstalk.com,amazonaws.com,sesblog.amazon.com,java.awsblog.com,mobile.awsblog.com,ruby.awsblog.com,portal.aws.amazon.com,apn-portal.com,aws-partner-directory.com,amazonaws.cn,www.aws.training,awsevents.com,qwiklabs.com,qwiklab.com,awseducate.com,console.aws.amazon.com,gamedev.amazon.com,awsloft.london,awssummit.london,awssummit.kr,awscloud.com,www2.aws.training,kiku.aws.training,quicksight.aws,amazonlightsail.com,chime.aws,amazonaws-china.com,partnercentral.awspartner.com,buildon.aws,awsloft-dublin.com,amazongames.com,calculator.aws,allthingsdistributed.com,atlas.aws,newworld.com,floor28.co.il,iotatlas.net,iotatlas.io,playthegrandtourgame.com,www.playthegrandtourgame.com,opendistro.github.io,intersect.aws,aws-startuphub.com,amazon.care,awsthinkbox.com,thinkboxsoftware.com,playlostark.com,awsmediamagazine.com,intersectmag.com,console.cloudendure.com,sagemaker.readthedocs.io',
};

// Test if user is coming from console
aws_sc.isFromConsole = /^https?:\/\/[a-zA-Z0-9_\.\-]*console\.(aws\.amazon\.com|amazonaws\.cn)($|\/)/.test(
    document.referrer.toString()
);

// Returns the report suite id(s) to be used
aws_sc.getAccount = function () {
    // Default report suite
    var ret = this.reportSuites.DEV;

    // Vary report suite depending on visitor status and domain

    var regExp = new RegExp('(' + this.awsPublicDomains.split(',').join('$|') + '$)', 'gi');
    var isAWSPublicDomain = window.location.hostname.match(regExp) ? true : false;

    var regStatus = this.getCookie('regStatus');

    // if referrer is console (standard console as well as china site console) then irrespective of cookie value, user status has to be registered
    if (aws_sc.isFromConsole && regStatus !== 'registered') {
        regStatus = 'registered';
    }
    aws_sc.registrationStatus = regStatus ? regStatus : 'pre-register';

    var isDev = this.mode === 'dev' ? true : false;

    if (isAWSPublicDomain && !isDev) {
        ret = this.reportSuites.PROD;
    }

    return ret;
};

// Returns the value of the given cookie
aws_sc.getCookie = function (cn) {
    var v = document.cookie.split(cn + '=')[1];
    if (v) {
        v = unescape(v.split(';')[0]);
    }
    if (v && v.length > 0) {
        return v;
    }
};

// Sets a cookie given a name and value
aws_sc.setCookie = function (cookie, value) {
    var date = new Date();
    date.setTime(date.getTime() + 10 * 365 * 24 * 3600 * 1000);
    var expirationDate = 'expires=' + date.toUTCString();
    document.cookie =
        cookie + '=' + value + '; ' + expirationDate + '; domain = amazon.com; path=/';
};

// Removes trailing /index.whatever, just a slash at the end of the URL, and if the result is null replace with a string null
aws_sc.cleanNonLocalizedPath = function (str) {
    str = str.replace(/(\/|\.\w+|\/index\.\w+)$/, '');

    if (str === '') {
        str = 'null';
    }

    return str;
};

// SiteCatalyst configuration
// ----------------------------------------------------------------------------

var s_account = aws_sc.getAccount();
var s = s_gi(s_account);
s.server = window.location.hostname;
s.charSet = 'UTF-8';
s.currencyCode = 'USD';
s.trackDownloadLinks = true;
s.trackExternalLinks = true;
s.trackInlineStats = true;
s.linkDownloadFileTypes =
    'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx,txt,msi,mpb,template';
s.linkInternalFilters = 'javascript:,' + aws_sc.awsPublicDomains + ',youtube.com';
s.linkLeaveQueryString = false;
s.linkTrackVars =
    'prop12,prop29,prop39,prop41,prop50,prop61,prop62,eVar12,eVar28,eVar29,eVar39,eVar41,eVar50,eVar61,eVar62';
s.linkTrackEvents = 'None';
s.useForcedLinkTracking = false;
s.visitorNamespace = aws_sc.visitorNamespace;
s.trackingServer = aws_sc.trackingServer;
aws_sc.resetLinkVars =
    'prop12,prop29,prop39,prop41,prop50,prop61,prop62,eVar12,eVar28,eVar29,eVar39,eVar41,eVar50,eVar61,eVar62';

// Enable the getActionDepth plugin
s.ActionDepthTest = true;

// Enable the userType plugin
s.userTypeFlag = true;

// Tracking internal search information
aws_sc.initSearch = function (evt, data) {
    var internalSearchQuery = data.query;
    var internalSearchCount = data.numSearchResults;
    var internalSearchSource = location.hostname.substring(0, location.hostname.indexOf('.'));
    var internalSearchTerm =
        internalSearchQuery +
        '|' +
        internalSearchSource +
        '|' +
        data.language +
        '|' +
        data.facet +
        '|' +
        data.product +
        '|' +
        data.guide;

    if (internalSearchQuery !== null && internalSearchQuery !== undefined) {
        if (internalSearchCount === 0) {
            s.eVar26 = s.prop26 = internalSearchTerm;
            s.eVar27 = s.prop27 = '0';
            s.events = s.apl(s.events, 'event2', ', ', 2);
            s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event2', ',', 2);
        } else {
            s.eVar27 = s.prop27 = internalSearchCount;
            s.eVar26 = s.prop26 = internalSearchTerm;
            s.events = s.apl(s.events, 'event1', ', ', 2);
            s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event1', ',', 2);
        }
    } else {
        s.eVar26 = s.prop26 = s.eVar27 = s.prop27 = '';
    }

    s.linkTrackVars =
        'events,prop26,eVar26,prop27,eVar27,prop39,eVar39,prop61,eVar61,eVar62,prop62';
    s.tl(this, 'o', 'Internal Search Call');
    s.linkTrackVars = 'None';
    s.linkTrackEvents = 'None';
    s.events = '';
    s.eVar26 = s.prop26 = s.eVar27 = s.prop27 = '';
};

// Attach custom events
aws_sc.attachCustomEvents = (function () {
    if (typeof jQuery !== 'undefined') {
        // We need the function check because some pages outside the marketing site use the old version of jquery.
        if (jQuery.fn.on) {
            // Attach an event to the new search page that loads the JS asynchronously.
            jQuery(document).on(
                'custom_aws_search_after-display-results',
                '#aws-search-result, #withScriptBody',
                aws_sc.initSearch
            );
        } else if (jQuery.fn.bind) {
            jQuery('#withScriptBody').bind(
                'custom_aws_search_after-display-results',
                aws_sc.initSearch
            );
        }
    }
})();

// Channel Manager Config
s._channelDomain =
    'Search Engine|google.com,about.com,altavista.com,ask.com,baidu.com,excite.com,infoseek.com,khoj.com,lycos.com,msn.com,bing.com,yahoo.com>Social|facebook.com,twitter.com,digg.com,linkedin.com,myspace.com,youtube.com,plus.google.com,tumblr.com,diigo.com,yelp.com,livejournal.com,blogspot.com,wordpress.com,stumbleupon.com,reddit.com,delicious.com,flickr.com,vimeo.com,t.co>News Sites|cnn.com,msn.com,nytimes.com,foxnews.com';
s._channelParameter = 'External Campaign|sc_channel>Internal Campaign|sc_ichannel';
s._channelPattern =
    'Paid Search|ps,PS>Social Media|sm,SM>Banner|ba,BA>Email|em,EM>Webinar|WE,we>Amazon Internal|EL,el>House Ads|HA,ha';

s.usePlugins = true;

// SiteCatalyst do_plugins section
function s_doPlugins() {
    s.plugins = '';
    s.userType();

    // Custom download link tracking
    if (s.linkType == 'd') {
        s.awsDownloadLinkHandler(s.linkURL);
    } else if (s.linkType == 'o' || s.linkType == '0') {
        // Custom link tracking
        s.lhref = s.linkURL;
        if (s.lhref) {
            s.lhtype = s.linkType;
            for (var i = 0; i < aws_sc.links.length; i++) {
                if (s.lhref.indexOf(aws_sc.links[i].lhref) > -1) {
                    s.linkType = 'o';
                    s[aws_sc.links[i].pluginName](s.lhref);
                    break;
                }
            }
        }
    }

    // Page name
    if (!s.pageType && !s.pageName) {
        s.pageName = aws_sc
            .cleanNonLocalizedPath(window.location.hostname + window.location.pathname)
            .toLowerCase();
    }

    // Days since last visit
    s.eVar35 = s.prop35 = s.getDaysSinceLastVisit('s_dslv');

    // Page count during visit
    if (s.ActionDepthTest) {
        // TODO: Change pdvalue to a local variable (not set on s)
        s.pdvalue = s.getActionDepth('s_depth');

        if (s.pdvalue) {
            s.prop47 = s.eVar47 = s.pdvalue;
        }
        s.ActionDepthTest = false;
    }

    // Visit number
    s.prop48 = s.eVar48 = s.getVisitNum(365, 's_vn');

    // Page URL
    s.eVar61 = location.href.toLowerCase();
    s.prop61 = s.eVar61;

    // Set the value of s_fid cookie to eVar and prop
    var sFidCookie = aws_sc.getCookie('s_fid');
    if (sFidCookie) {
        s.prop29 = sFidCookie;
        s.eVar29 = s.prop29;
    }

    // Set the value of Target cookie to eVar and prop
    var sTidCookie = aws_sc.getCookie('aws-target-visitor-id');
    if (sTidCookie) {
        s.prop12 = sTidCookie;
        s.eVar12 = s.prop12;
    }

    // Page URL with no protocol or query string
    s.prop39 = location.hostname + location.pathname;
    s.eVar39 = s.prop39;

    // Finds localization code - followed code to set locale
    aws_sc.aws_loc_code = function () {
        var path = window.location.href;
        var codes = [
            'ar',
            'en',
            'es',
            'de',
            'fr',
            'id',
            'it',
            'jp',
            'ko',
            'pt',
            'ru',
            'th',
            'tr',
            'vi',
            'cn',
            'tw',
        ];

        for (var i = 0; i < codes.length; i++) {
            if (path.indexOf('/' + codes[i] + '/') > -1) {
                return codes[i];
            }
        }

        return 'en';
    };

    s.prop41 = aws_sc.aws_loc_code();
    if (s.prop41) {
        s.eVar41 = s.prop41;
    }

    if (
        window.location.href.indexOf('portal.aws.amazon.com') === -1 &&
        window.location.href.indexOf('/registration-confirmation') === -1
    ) {
        s.eVar25 = window.location.href.toLowerCase();
    }

    // SiteCatalyst s_vi cookie contents
    s.prop50 = s.eVar50 = 'D=s_vi';

    // Get new or repeat visitor
    s.prop13 = s.getNewRepeat(90);
    if (s.prop13) {
        s.eVar13 = s.prop13;
    }

    // Get useragent string
    s.prop71 = navigator.userAgent;
    if (s.prop71) {
        s.eVar71 = s.prop71;
    }

    // Appending the Query String
    aws_sc.getConcatQueryParams = function (params, delimiter) {
        var concatValues = '';
        var isFirst = true;

        if (typeof params === 'object') {
            for (var i = 0; i < params.length; i++) {
                var value = s.Util.getQueryParam(params[i]);
                if (value.length > 0) {
                    concatValues += isFirst ? value : delimiter + value;
                    isFirst = false;
                }
            }
        }

        return concatValues;
    };

    // Query string parameter consists of sc_channel which corresponds to a campaign referral
    if (s.Util.getQueryParam('sc_channel')) {
        s.campaign = aws_sc.getConcatQueryParams(
            [
                'sc_channel',
                'sc_campaign',
                'sc_publisher',
                'sc_medium',
                'sc_content',
                'sc_detail',
                'sc_segment',
                'sc_category',
                'sc_place',
                'sc_keyword',
                'sc_brand',
                'sc_outcome',
                'sc_matchtype',
                'sc_country',
                'sc_geo',
                'trk',
            ],
            '|'
        );
        s.campaign = s.getValOnce(s.campaign, 's_campaign', 0);

        // If s.campaign gets set from the value, check whether s.campaign is present or length is greater than 0
        if (s.campaign && s.campaign.length > 0) {
            s.prop63 = s.campaign;

            s.eVar45 = s.Util.getQueryParam('sc_channel');
            if (s.eVar45) s.prop45 = s.eVar45;

            s.eVar32 = s.Util.getQueryParam('sc_geo');
            if (s.eVar32) s.prop32 = s.eVar32;

            s.eVar51 = s.Util.getQueryParam('sc_campaign');
            if (s.eVar51) s.prop51 = s.eVar51;

            s.eVar52 = s.Util.getQueryParam('sc_publisher');
            if (s.eVar52) s.prop52 = s.eVar52;

            s.eVar53 = s.Util.getQueryParam('sc_medium');
            if (s.eVar53) s.prop53 = s.eVar53;

            s.eVar54 = s.Util.getQueryParam('sc_content');
            if (s.eVar54) s.prop54 = s.eVar54;

            s.eVar55 = s.Util.getQueryParam('sc_detail');
            if (s.eVar55) s.prop55 = s.eVar55;

            s.eVar20 = s.Util.getQueryParam('sc_segment');
            if (s.eVar20) s.prop20 = s.eVar20;

            s.eVar21 = s.Util.getQueryParam('sc_category');
            if (s.eVar21) s.prop21 = s.eVar21;

            s.eVar36 = s.Util.getQueryParam('sc_brand');
            if (s.eVar36) s.prop36 = s.eVar36;

            s.eVar37 = s.Util.getQueryParam('sc_matchtype');
            if (s.eVar37) s.prop37 = s.eVar37;

            s.eVar38 = s.Util.getQueryParam('sc_country');
            if (s.eVar38) s.prop38 = s.eVar38;

            s.eVar34 = s.Util.getQueryParam('sc_outcome');
            if (s.eVar34) s.prop31 = s.eVar34;

            s.eVar5 = s.Util.getQueryParam('trk');
            if (s.eVar5) s.prop30 = s.eVar5;
        }
    }

    // Identifying Internal campaign details if the external campaign is not present
    if (!s.campaign) {
        s.eVar60 = aws_sc.getConcatQueryParams(
            [
                'sc_ichannel',
                'sc_icampaign',
                'sc_icontent',
                'sc_iplace',
                'sc_idetail',
                'sc_ipage',
                'sc_isegment',
                'sc_icountry',
                'sc_iproduct',
                'sc_icategory',
                'sc_icampaigntype',
                'trk',
            ],
            '|'
        );
        s.eVar60 = s.getValOnce(s.eVar60, 's_eVar60', 0);
    }

    if (s.eVar60) {
        s.prop60 = s.eVar60;

        s.eVar24 = s.Util.getQueryParam('sc_ichannel');
        if (s.eVar24) s.prop24 = s.eVar24;

        s.eVar56 = s.Util.getQueryParam('sc_icampaign');
        if (s.eVar56) s.prop56 = s.eVar56;

        s.eVar57 = s.Util.getQueryParam('sc_icontent');
        if (s.eVar57) s.prop57 = s.eVar57;

        s.eVar58 = s.Util.getQueryParam('sc_iplace');
        if (s.eVar58) s.prop58 = s.eVar58;

        s.eVar59 = s.Util.getQueryParam('sc_idetail');
        if (s.eVar59) s.prop59 = s.eVar59;

        s.eVar14 = s.Util.getQueryParam('sc_ipage');
        if (s.eVar14) s.prop14 = s.eVar14;

        s.eVar15 = s.Util.getQueryParam('sc_isegment');
        if (s.eVar15) s.prop15 = s.eVar15;

        s.eVar16 = s.Util.getQueryParam('sc_icountry');
        if (s.eVar16) s.prop16 = s.eVar16;

        s.eVar17 = s.Util.getQueryParam('sc_iproduct');
        if (s.eVar17) s.prop17 = s.eVar17;

        s.eVar18 = s.Util.getQueryParam('sc_icategory');
        if (s.eVar18) s.prop18 = s.eVar18;

        s.eVar19 = s.Util.getQueryParam('sc_icampaigntype');
        if (s.eVar19) s.prop19 = s.eVar19;

        s.eVar5 = s.Util.getQueryParam('trk');
        if (s.eVar5) s.prop30 = s.eVar5;
    }

    if (aws_sc.registrationStatus) {
        s.eVar62 = aws_sc.registrationStatus;
        var c = new Date();
        c.setDate(c.getDate() + 999);
        s.c_w('regStatus', s.eVar62, c);
        s.prop62 = s.eVar62;
    }

    if (s.channel) {
        s.eVar42 = s.channel;
    }
    if (s.eVar42) {
        s.prop42 = s.eVar42;
    }
    if (s.hier1) {
        s.eVar43 = s.hier1;
    }
    if (s.eVar43) {
        s.prop43 = s.eVar43;
    }

    // channelManager : This module is used to set traffic sources channel to Omniture Variables - eVar30 and eVar31
    if (s.Util.getQueryParam('sc_ichannel')) {
        s.channelManager('sc_ichannel');
    } else {
        s.channelManager('sc_channel');
    }
    if (s._channel == 'Direct Load') {
        s._channel = s._campaign = 'Direct';
    }
    if (s._channel == 'Search Engine') {
        s._campaign = 'organic : ' + s._campaign;
    }
    if (s._channel == 'Paid Search') {
        s._channel = 'Paid Search Campaign';
    }
    if (s._campaign == 'direct') {
        s._channel = s._campaign = 'Direct';
        s.referrer = '';
    }

    s.eVar30 = s._channel;
    s.eVar31 = s._campaign;

    // set the version number for the s_code
    s.prop11 = aws_sc.awsSCVersion;

    // set eVar2 if user comes from Console
    if (aws_sc.isFromConsole) {
        s.eVar2 = document.referrer.toString();
    }
}

// set Munchkin ID
aws_sc.munchkinID = aws_sc.getCookie('_mkto_trk');
if (aws_sc.munchkinID) {
    s.eVar28 = aws_sc.munchkinID;
}

// For registration confirmation pages outside of the funnel

// Marketing confirmation
if (
    window.location.href.indexOf('/registration-confirmation') > -1 &&
    aws_sc.getCookie('regStatus') === 'registering'
) {
    aws_sc.setCookie('regStatus', 'registered');
    s.pageName = 'Registration Confirmation';

    // Make sure you have the accountID cookie
    if (aws_sc.getCookie('aws-reg-aid')) {
        aws_sc.accountID = aws_sc.getCookie('aws-reg-aid');
        s.prop1 = aws_sc.accountID; // variable they assign for this
    }

    if (aws_sc.getCookie('aws-reg-guid')) {
        aws_sc.customerID = aws_sc.getCookie('aws-reg-guid');
        s.prop2 = aws_sc.customerID; // variable they assign for this

        // New for transitioning customerID
        document.cookie = 'aws-reg-guid=; domain=amazon.com; path=/; secure';
    }
    s.events = 'event65,event96:' + aws_sc.customerID;
    s.eVar62 = 'registered';
    aws_sc.registrationStatus = 'registered';

    setTimeout(function () {
        new Image().src =
            'https://fls-na.amazon.com/1/4167132/1/OP/?id=348126a6-0295-4892-852f-7113bbcc5e2f&type=32';
    }, 0);
}

s.doPlugins = s_doPlugins;

// Adobe SiteCatalyst plugins
// ----------------------------------------------------------------------------

/**
 * Media Module Configuration and Delegation
 *
 * Accepts a custom event to the namespace defined by CUSTOM_EVENT_NAME.
 *
 * {
 *   name: <Play|Pause|Seek|Complete100Pct>,
 *   playerName: <VideoJS|JWPlayer>,
 *   videoUrl: <video-url>,
 *   videoTitle: <video-title>,
 *   time: <current-time>,
 *   duration: <total-duration>
 * }
 */
(function () {
    var MediaModuleEventDelegator = function (Media) {
        var CUSTOM_EVENT_NAME = 'custom_aws_video';
        var openVideos = {};

        return {
            // Listens for global video player events and passes to delegation
            listen: function () {
                var that = this;
                document.addEventListener(
                    CUSTOM_EVENT_NAME,
                    function (e) {
                        if (e.detail) {
                            that.delegateEvent.call(that, e.detail);
                        }
                    },
                    false
                );
            },

            // Delegates by the given event type to specific Media Module wrappers
            delegateEvent: function (e) {
                var mediaName = e.videoUrl;
                switch (e.name) {
                    case 'Play':
                        this.play(e, mediaName);
                        break;
                    case 'Pause':
                        this.pause(e, mediaName);
                        break;
                    case 'Seek':
                        this.seek(e, mediaName);
                        break;
                    case 'Complete100Pct':
                        this.complete(e, mediaName);
                        break;
                }
            },

            play: function (e, mediaName) {
                this.setEVar(76, e.videoTitle);
                this.setEVar(79, e.playerName);

                if (!openVideos.hasOwnProperty(mediaName)) {
                    openVideos[mediaName] = true;
                    Media.open(mediaName, e.duration, e.playerName);
                }

                Media.play(mediaName, e.time);
            },

            pause: function (e, mediaName) {
                Media.stop(mediaName, e.time);
            },

            seek: function (e, mediaName) {
                Media.stop(mediaName, e.time);
            },

            complete: function (e, mediaName) {
                if (openVideos.hasOwnProperty(mediaName)) {
                    delete openVideos[mediaName];
                }

                Media.stop(mediaName, e.time);
                Media.close(mediaName);

                this.clearEVar(76);
                this.clearEVar(79);
            },

            setEVar: function (num, val) {
                s['eVar' + num] = val;
            },

            clearEVar: function (num) {
                s['eVar' + num] = '';
            },
        };
    };

    var MediaModuleController = {
        // Sets Media Module configuration and initializes the event delegator
        init: function () {
            if (!s.enableVideoTracking) {
                return;
            }

            s.loadModule('Media');
            var Media = s.Media;
            Media.autoTrack = false;
            Media.trackVars = 'events,prop61,eVar61,prop70,eVar70,eVar76,eVar77,eVar78,eVar79';
            Media.trackEvents = 'event21,event22,event23,event24,event25,event26,event27';
            Media.trackMilestones = '25,50,75';
            Media.segmentByMilestones = true;
            Media.trackUsingContextData = true;
            Media.contextDataMapping = {
                'a.media.name': 'eVar70,prop70',
                'a.media.segment': 'eVar77',
                'a.contentType': 'eVar78',
                'a.media.timePlayed': 'event21',
                'a.media.view': 'event22',
                'a.media.segmentView': 'event23',
                'a.media.complete': 'event27',
                'a.media.player.metadata': 'prop61,eVar61,eVar76,eVar79',
                'a.media.milestones': {
                    25: 'event24',
                    50: 'event25',
                    75: 'event26',
                },
            };

            MediaModuleEventDelegator(Media).listen();
        },
    };

    // Expose modules for testing
    aws_sc.MediaModuleEventDelegator = MediaModuleEventDelegator;
    aws_sc.MediaModuleController = MediaModuleController;
})();

s.enableVideoTracking = true;
aws_sc.MediaModuleController.init();

/*
 * Plugin Utility: Append to List v1.2
 */
s.apl = function (l, v, d, u) {
  var s = this,
    m = 0;
  if (!l) l = "";
  if (u) {
    var i,
      n,
      a = l.split(d),
      al = a.length;
    for (i = 0; i < al; i++) {
      n = a[i];
      m = m || (u == 1 ? n == v : n.toLowerCase() == v.toLowerCase());
    }
  }
  if (!m) l = l ? l + d + v : v;
  return l;
};

/*
 * Utility Function: split v1.5 (JS 1.0 compatible)
 */
s.split = function (l, d) {
  var i,
    x = 0,
    a = new Array();
  while (l) {
    i = l.indexOf(d);
    i = i > -1 ? i : l.length;
    a[x++] = l.substring(0, i);
    l = l.substring(i + d.length);
  }
  return a;
};

/*
 * Utility: inList v1.1 - find out if a value is in a list
 */
s.inList = function (v, l, d, tlc, mt) {
    if (!l) return false;

    var s = this,
        ar = [],
        i = 0,
        d = d ? d : ',',
        v = tlc ? v.toLowerCase() : v,
        l = tlc ? l.toLowerCase() : l,
        mt = mt ? mt : 0,
        r = false;

    if (typeof l == 'string') {
        if (s.split) {
            ar = s.split(l, d);
        } else if (l.split) {
            ar = l.split(d);
        }
    } else {
        ar = l;
    }

    while (i < ar.length) {
        if (!mt) {
            r = v == ar[i] ? true : r;
        } else if (mt) {
            r = v.indexOf(ar[i]) != -1 ? true : r;
        }
        i++;
    }

    return r;
};

/*
 * Plugin: getVisitNum v3.0
 */
s.getVisitNum = function (tp, c, c2) {
  var s = this,
    e = new Date(),
    cval,
    cvisit,
    ct = e.getTime(),
    d;
  if (!tp) {
    tp = "m";
  }
  if (tp == "m" || tp == "w" || tp == "d") {
    (eo = s.endof(tp)), (y = eo.getTime());
    e.setTime(y);
  } else {
    d = tp * 86400000;
    e.setTime(ct + d);
  }
  if (!c) {
    c = "s_vnum";
  }
  if (!c2) {
    c2 = "s_invisit";
  }
  cval = s.c_r(c);
  if (cval) {
    var i = cval.indexOf("&vn="),
      str = cval.substring(i + 4, cval.length),
      k;
  }
  cvisit = s.c_r(c2);
  if (cvisit) {
    if (str) {
      e.setTime(ct + 1800000);
      s.c_w(c2, "true", e);
      return str;
    } else {
      return "unknown visit number";
    }
  } else {
    if (str) {
      str++;
      k = cval.substring(0, i);
      e.setTime(k);
      s.c_w(c, k + "&vn=" + str, e);
      e.setTime(ct + 1800000);
      s.c_w(c2, "true", e);
      return str;
    } else {
      s.c_w(c, e.getTime() + "&vn=1", e);
      e.setTime(ct + 1800000);
      s.c_w(c2, "true", e);
      return 1;
    }
  }
};
s.dimo = function (m, y) {
  var d = new Date(y, m + 1, 0);
  return d.getDate();
};
s.endof = function (x) {
  var t = new Date();
  t.setHours(0);
  t.setMinutes(0);
  t.setSeconds(0);
  if (x == "m") {
    d = s.dimo(t.getMonth(), t.getFullYear()) - t.getDate() + 1;
  } else if (x == "w") {
    d = 7 - t.getDay();
  } else {
    d = 1;
  }
  t.setDate(t.getDate() + d);
  return t;
};


/*
 * Plugin: getNewRepeat v1.2 - Returns whether user is new or repeat
 */
s.getNewRepeat = function (d, cn) {
  var s = this,
    e = new Date(),
    cval,
    sval,
    ct = e.getTime();
  d = d ? d : 30;
  cn = cn ? cn : "s_nr";
  e.setTime(ct + d * 24 * 60 * 60 * 1000);
  cval = s.c_r(cn);
  if (cval.length == 0) {
    s.c_w(cn, ct + "-New", e);
    return "New";
  }
  sval = s.split(cval, "-");
  if (ct - sval[0] < 30 * 60 * 1000 && sval[1] == "New") {
    s.c_w(cn, ct + "-New", e);
    return "New";
  } else {
    s.c_w(cn, ct + "-Repeat", e);
    return "Repeat";
  }
};


/*
 * Plugin: Days since last Visit v1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit = function (c) {
  var s = this,
    e = new Date(),
    es = new Date(),
    cval,
    cval_s,
    cval_ss,
    ct = e.getTime(),
    day = 24 * 60 * 60 * 1000,
    f1,
    f2,
    f3,
    f4,
    f5;
  e.setTime(ct + 3 * 365 * day);
  es.setTime(ct + 30 * 60 * 1000);
  f0 = "Cookies Not Supported";
  f1 = "First Visit";
  f2 = "More than 30 days";
  f3 = "More than 7 days";
  f4 = "Less than 7 days";
  f5 = "Less than 1 day";
  cval = s.c_r(c);
  if (cval.length == 0) {
    s.c_w(c, ct, e);
    s.c_w(c + "_s", f1, es);
  } else {
    var d = ct - cval;
    if (d > 30 * 60 * 1000) {
      if (d > 30 * day) {
        s.c_w(c, ct, e);
        s.c_w(c + "_s", f2, es);
      } else if (d < 30 * day + 1 && d > 7 * day) {
        s.c_w(c, ct, e);
        s.c_w(c + "_s", f3, es);
      } else if (d < 7 * day + 1 && d > day) {
        s.c_w(c, ct, e);
        s.c_w(c + "_s", f4, es);
      } else if (d < day + 1) {
        s.c_w(c, ct, e);
        s.c_w(c + "_s", f5, es);
      }
    } else {
      s.c_w(c, ct, e);
      cval_ss = s.c_r(c + "_s");
      s.c_w(c + "_s", cval_ss, es);
    }
  }
  cval_s = s.c_r(c + "_s");
  if (cval_s.length == 0) return f0;
  else if (
    cval_s != f1 &&
    cval_s != f2 &&
    cval_s != f3 &&
    cval_s != f4 &&
    cval_s != f5
  )
    return "";
  else return cval_s;
};

/*
 * Plugin: getActionDepth v1.0 - Returns the current page number of the visit
 */
s.getActionDepth = function (c) {
  var s = this,
    v = 1,
    t = new Date();
  t.setTime(t.getTime() + 1800000);
  if (!s.c_r(c)) {
    v = 1;
  }
  if (s.c_r(c)) {
    v = s.c_r(c);
    v++;
  }
  if (!s.c_w(c, v, t)) {
    s.c_w(c, v, 0);
  }
  return v;
};

/*
 * Plugin: getValOnce_v1.11
 */
s.getValOnce = function (v, c, e, t) {
  var s = this,
    a = new Date(),
    v = v ? v : "",
    c = c ? c : "s_gvo",
    e = e ? e : 0,
    i = t == "m" ? 60000 : 86400000,
    k = s.c_r(c);
  if (v) {
    a.setTime(a.getTime() + e * i);
    s.c_w(c, v, e == 0 ? 0 : a);
  }
  return v == k ? "" : v;
};

/*
 * Plugin Utility: Replace v1.0
 */
s.repl = function (x, o, n) {
    var i = x.indexOf(o),
        l = n.length;
    while (x && i >= 0) {
        x = x.substring(0, i) + n + x.substring(i + o.length);
        i = x.indexOf(o, i + l);
    }
    return x;
};

/* Plugin: channelManager v3.05 */
s.channelManager = function (a, b, c, d, e, f, g) {
    var s = this,
        h = new Date(),
        i = 0,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        t,
        u,
        v,
        w,
        x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H,
        I,
        J,
        K,
        L,
        M,
        N,
        O,
        P,
        Q,
        R,
        S,
        T,
        U,
        V;
    U = s.getQueryParam ? 1 : 0;
    V = s.repl ? 1 : 0;
    if (e) {
        i = 1;
        if (s.c_r(e)) i = 0;
        h.setTime(h.getTime() + 18e5);
        s.c_w(e, 1, h);
        if (f && s.c_r('s_tbm' + e + f)) i = 0;
    }
    j = s.referrer ? s.referrer : document.referrer;
    if (j == 'Typed/Bookmarked') j = '';
    j = decodeURIComponent(j.toLowerCase());
    if (!j) k = 1;
    else {
        l = j.indexOf('?') > -1 ? j.indexOf('?') : j.length;
        m = j.substring(0, l);
        n = j.split('/');
        n = n[2].split('?');
        o = n[0].toLowerCase();
        p = s.linkInternalFilters.toLowerCase();
        p = p.split(',');
        for (q = 0; q < p.length; q++) {
            r = o.indexOf(p[q]) == -1 ? '' : j;
            if (r) break;
        }
    }
    if (!r && !k) {
        t = j;
        u = o;
        w = 'Other Natural Referrers';
        v = w + ': ' + o;
        x = s.seList + '>' + s._extraSearchEngines;
        if (d == 1) {
            m = V ? s.repl(m, 'oogle', '%') : s.replace(m, 'oogle', '%');
            m = V ? s.repl(m, 'ahoo', '^') : s.replace(m, 'ahoo', '^');
            j = V ? s.repl(j, 'as_q', '*') : s.replace(j, 'as_q', '*');
        }
        y = x.split('>');
        for (z = 0; z < y.length; z++) {
            A = y[z];
            A = A.split('|');
            B = A[0].split(',');
            for (C = 0; C < B.length; C++) {
                D = m.indexOf(B[C]);
                if (D > -1) {
                    if (A[2]) E = v = A[2];
                    else E = o;
                    if (d == 1) {
                        E = V ? s.repl(E, '#', ' - ') : s.replace(E, '#', ' - ');
                        j = V ? s.repl(j, '*', 'as_q') : s.replace(j, '*', 'as_q');
                        E = V ? s.repl(E, '^', 'ahoo') : s.replace(E, '^', 'ahoo');
                        E = V ? s.repl(E, '%', 'oogle') : s.replace(E, '%', 'oogle');
                    }
                    F = A[1].split(',');
                    for (G = 0; G < F.length; G++) {
                        if (
                            j.indexOf(F[G] + '=') > -1 ||
                            j.indexOf('googlequicksearchbox') > -1 ||
                            j.indexOf('https://www.google.') == 0 ||
                            j.indexOf('https://search.yahoo.com/') == 0 ||
                            j.indexOf('https://www.bing.com') == 0
                        )
                            H = 1;
                        I = U
                            ? s.getQueryParam(F[G], '', j).toLowerCase()
                            : s.Util.getQueryParam(F[G], j).toLowerCase();
                        if (H || I) break;
                    }
                }
                if (H || I) break;
            }
            if (H || I) break;
        }
    }
    if (!r || g != '1') {
        J = a.split(',');
        for (var q in J)
            if (J.hasOwnProperty(q))
                if (U ? s.getQueryParam(J[q]) : s.Util.getQueryParam(J[q]))
                    if (b)
                        T = T
                            ? T + b + (U ? s.getQueryParam(J[q]) : s.Util.getQueryParam(J[q]))
                            : U
                            ? s.getQueryParam(J[q])
                            : s.Util.getQueryParam(J[q]);
                    else {
                        T = U ? s.getQueryParam(J[q]) : s.Util.getQueryParam(J[q]);
                        if (T) break;
                    }
        if (T) {
            v = T;
            if (E) w = 'Paid Search';
            else w = 'Unknown Paid Channel';
        }
        if (!T && E && H) {
            w = 'Natural Search';
            v = w + ': ' + E;
        }
    }
    if (i && k && !T) t = u = v = w = 'Typed/Bookmarked';
    J = s._channelDomain;
    if (J && o && !r) {
        K = J.split('>');
        for (L = 0; L < K.length; L++) {
            M = K[L] ? K[L].split('|') : '';
            N = M[1] ? M[1].split(',') : '';
            O = N.length;
            for (P = 0; P < O; P++) {
                Q = N[P].toLowerCase();
                R = ('/' + o).indexOf(Q);
                if (R > -1) {
                    w = M[0];
                    v = T ? v : M[0] + ': ' + o;
                    break;
                }
            }
            if (R > -1) break;
        }
    }
    J = s._channelParameter;
    if (J) {
        K = J.split('>');
        for (L = 0; L < K.length; L++) {
            M = K[L] ? K[L].split('|') : '';
            N = M[1] ? M[1].split(',') : '';
            O = N.length;
            for (P = 0; P < O; P++) {
                R = U ? s.getQueryParam(N[P]) : s.Util.getQueryParam(N[P]);
                if (R) {
                    w = M[0];
                    break;
                }
            }
            if (R) break;
        }
    }
    J = s._channelPattern;
    if (J) {
        K = J.split('>');
        for (L = 0; L < K.length; L++) {
            M = K[L] ? K[L].split('|') : '';
            N = M[1] ? M[1].split(',') : '';
            O = N.length;
            for (P = 0; P < O; P++) {
                Q = N[P].toLowerCase();
                R = T ? T.toLowerCase() : '';
                S = R.indexOf(Q);
                if (S == 0) {
                    w = M[0];
                    break;
                }
            }
            if (S == 0) break;
        }
    }
    S = w ? T + u + w + I : '';
    c = c ? c : 'c_m';
    if (c != '0') S = s.getValOnce(S, c, 0);
    if (S) {
        s._campaignID = T ? T : 'n/a';
        s._referrer = t ? t : 'n/a';
        s._referringDomain = u ? u : 'n/a';
        s._campaign = v ? v : 'n/a';
        s._channel = w ? w : 'n/a';
        s._partner = E ? E : 'n/a';
        s._keywords = H ? (I ? I : 'Keyword Unavailable') : 'n/a';
        if (f && w != 'Typed/Bookmarked') {
            h.setTime(h.getTime() + f * 864e5);
            s.c_w('s_tbm' + e + f, 1, h);
        }
    } else
        s._campaignID = s._referrer = s._referringDomain = s._campaign = s._channel = s._partner = s._keywords =
            '';
};
/* channelManager seList */
s.seList =
    'google.,googlesyndication.com,.googleadservices.com|q,as_q|Google>bing.com|q|Bing>yahoo.com,yahoo.co.jp|p,va|Yahoo!>ask.jp,ask.co|q,ask|Ask>search.aol.,suche.aolsvc.de|q,query|AOL>altavista.co,altavista.de|q,r|AltaVista>.mywebsearch.com|searchfor|MyWebSearch>webcrawler.com|q|WebCrawler>wow.com|q|Wow>infospace.com|q|InfoSpace>blekko.com|q|Blekko>dogpile.com|q|DogPile>alhea.com|q|Alhea>duckduckgo.com|q|DuckDuckGo>info.com|qkw|Info.com>contenko.com|q|Contenko>baidu.com|word,wd|Baidu>daum.net,search.daum.net|q|Daum>icqit.com|q|icq>myway.com|searchfor|MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query,search|Netscape Search>reference.com|q|Reference.com>seznam|w|Seznam.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query|Tiscali>virgilio.it|qs|Virgilio>yandex|text|Yandex.ru>optimum.net|q|Optimum Search>search.earthlink.net|q|Earthlink>search.comcast.net|q|Comcast>libero.it|query|libero.it>excite.co|search|Excite>mail.ru|q|Mail.ru>isearch.avg.com|q|AVG>msn.com|q|MSN>seznam.cz|q|seznam.cz>so.com|q|so.com>ixquick.com|query|ixquick.com>sogou.com|query|sogou.com>360.cn|q|360.cn';

// Amazon custom SiteCatalyst plugins
// ----------------------------------------------------------------------------

(function (global) {
    var STD_LINK_TRACK_VARS =
        'prop12,prop29,prop39,prop41,prop50,prop61,prop62,eVar12,eVar28,eVar29,eVar39,eVar41,eVar50,eVar61,eVar62,events';
    var LINK_TYPE_CUSTOM = 'o';

    var LinkTrackUtils = {
        // Makes a custom linktrack call given a single 'eVar', 'event', and value
        // https://marketing.adobe.com/resources/help/en_US/sc/implement/link-tracking.html
        callLinkTrack: function (trackerVar, linkName, eVar, event, val) {
            trackerVar[eVar] = val;
            trackerVar.linkTrackVars = eVar + ',' + STD_LINK_TRACK_VARS;
            trackerVar.events = event;
            trackerVar.linkTrackEvents = trackerVar.events;
            trackerVar.tl(trackerVar, LINK_TYPE_CUSTOM, linkName);

            // Save sent vars for testing and clear
            this._lastVars = trackerVar.linkTrackVars;
            this._lastEvents = trackerVar.linkTrackEvents;
            this.clearVars(trackerVar);
        },

        clearVars: function (trackerVar) {
            trackerVar.linkTrackVars = 'None';
            trackerVar.linkTrackEvents = 'None';
        },

        _lastVars: '',
        _lastEvents: '',
    };

    // Expose modules for testing
    global.LinkTrackUtils = LinkTrackUtils;
})(aws_sc);

(function (global) {
    var LINK_NAME = 'DOMComplete';
    var LINK_EVAR = 'eVar63';
    var LINK_EVENT = 'event33';

    var LinkTrackUtils;

    var PageLoadTracker = {
        init: function (Utils) {
            LinkTrackUtils = Utils;
            this.onDOMComplete(this.callWithLoadTime);
        },

        // Makes a custom linktrack call with the page load time
        callWithLoadTime: function () {
            var t = this.getDOMCompleteTime();
            if (t && t > 0) {
                LinkTrackUtils.callLinkTrack(s, LINK_NAME, LINK_EVAR, LINK_EVENT, t);
            }
        },

        // Calls the given callback on DOMComplete
        onDOMComplete: function (cb) {
            var ctx = this;
            if (document.readyState === 'complete') {
                cb.call(ctx);
            } else {
                document.addEventListener(
                    'readystatechange',
                    function () {
                        if (document.readyState === 'complete') {
                            cb.call(ctx);
                        }
                    },
                    false
                );
            }
        },

        // Returns the DOMComplete time from the performance timing API
        getDOMCompleteTime: function (w) {
            w = w || window;

            var t;
            if ('performance' in w && 'timing' in w.performance) {
                var timing = w.performance.timing;
                if (timing.domComplete && timing.responseEnd) {
                    t = timing.domComplete - timing.responseEnd;
                }
            }

            return t;
        },
    };

    // Expose modules for testing
    global.PageLoadTracker = PageLoadTracker;
})(aws_sc);

aws_sc.PageLoadTracker.init(aws_sc.LinkTrackUtils);

// Tracking for directories-cards interaction. In order for simplicity in reporting and clear separation, there are three events
// registered: initial-load (event117), update (event115), filter-uncheck/reset (event116).
(function (global) {
    var LINK_NAME = 'Directories Cards Interaction';
    var LINK_EVAR = 'eVar91';

    var CUSTOM_CARDS_EVENTS_MAP = {
        'custom_libra-directories-cards_update': 'event115',
        'custom_libra-directories-cards_reset': 'event116',
        'custom_libra-directories-cards_initial-load': 'event117',
    };

    var LinkTrackUtils;

    var DirectoriesCardsInteraction = {
        init: function (Utils) {
            LinkTrackUtils = Utils;
            this.addEventListeners();
        },

        addEventListeners: function () {
            Object.keys(CUSTOM_CARDS_EVENTS_MAP).forEach(function (customEvt) {
                document.addEventListener(
                    customEvt,
                    function (event) {
                        LinkTrackUtils.callLinkTrack(
                            s,
                            LINK_NAME,
                            LINK_EVAR,
                            CUSTOM_CARDS_EVENTS_MAP[event.type],
                            event.detail
                        );
                    },
                    false
                );
            });
        },
    };

    // Expose modules for testing
    global.DirectoriesCardsInteraction = DirectoriesCardsInteraction;
})(aws_sc);

aws_sc.DirectoriesCardsInteraction.init(aws_sc.LinkTrackUtils);

(function (global) {
    var LINK_NAME = 'ScrollDepth';
    var LINK_EVAR = 'eVar64';
    var LINK_EVENT = 'event34';

    var LinkTrackUtils;

    var ScrollDepthTracker = {
        init: function (Utils) {
            LinkTrackUtils = Utils;
            this.logScrollDepth();
        },

        // Returns a delimited string of depths as percentage of the total page height
        getScrollDepthValue: function (arr, pageHeight) {
            if (pageHeight <= 0) {
                return 'null';
            }

            var ret = [];
            for (var i = 0, len = arr.length; i < len; i++) {
                ret.push(Math.round((arr[i] / pageHeight) * 100));
            }

            return ret.join('|');
        },

        // Returns the max of a set of document height values
        getPageHeight: function (body, html) {
            body = body || document.body;
            html = html || document.documentElement;

            return Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
                0
            );
        },

        // Calls the given callback on DOMContentLoaded
        onDOMContentLoaded: function (cb) {
            var ctx = this;
            if (
                document.readyState === 'complete' ||
                (document.readyState !== 'loading' && !document.documentElement.doScroll)
            ) {
                cb.call(ctx);
            } else {
                document.addEventListener(
                    'DOMContentLoaded',
                    function () {
                        cb.call(ctx);
                    },
                    false
                );
            }
        },

        // Watches page scroll to collect initial, max, and last scroll depths before
        // reporting upon page unload
        logScrollDepth: function () {
            if (!('scrollY' in window)) {
                return;
            }

            var lastDepth = window.scrollY;
            var maxDepth = lastDepth;
            var initialDepth = lastDepth;

            function updateInitialDepth() {
                initialDepth = window.scrollY;
            }

            // Repopulate 'initialDepth' since if browser loads in middle of page, it
            // usually starts at the top before quickly moving to the savedposition
            this.onDOMContentLoaded(updateInitialDepth);

            // Update last and max depth on scroll
            var count = 0;
            document.addEventListener(
                'scroll',
                function () {
                    var id = ++count;
                    setTimeout(function () {
                        if (id === count) {
                            lastDepth = window.scrollY;
                            if (lastDepth > maxDepth) {
                                maxDepth = lastDepth;
                            }
                        }
                    }, 200);
                },
                false
            );

            var that = this;
            function onUnload() {
                var pageHeight = that.getPageHeight();
                var val = that.getScrollDepthValue([initialDepth, maxDepth, lastDepth], pageHeight);
                LinkTrackUtils.callLinkTrack(s, LINK_NAME, LINK_EVAR, LINK_EVENT, val);
            }

            // Using unload handler disables the back-forward cache (1) thus hindering
            // page performance. Because marketing sites tend to trigger XHR requests
            // and other analytics requests so commonly upon page navigation, bfcache
            // isn't really available anyway (2). Attempting to use 'pagehide'
            // event (3) instead resulted in pending or incomplete requests upon page
            // navigation for this ScrollDepth linktrack.
            // (1) https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload
            // (2) https://developer.mozilla.org/en-US/Firefox/Releases/1.5/Using_Firefox_1.5_caching
            // (3) https://webkit.org/blog/516/webkit-page-cache-ii-the-unload-event/
            window.addEventListener('beforeunload', onUnload, false);
        },
    };

    // Expose modules for testing
    global.ScrollDepthTracker = ScrollDepthTracker;
})(aws_sc);

aws_sc.ScrollDepthTracker.init(aws_sc.LinkTrackUtils);

// TODO: Confirm that this plugin is used.
s.userType = function () {
    if (!this.userTypeFlag) {
        return;
    }

    var s = this,
        subm,
        newu,
        pwd = document.getElementById('ap_password');

    s.userTypeFlag = false;

    if (pwd) {
        if (document.getElementById('signInSubmit')) {
            if (document.getElementById('ap_signin_existing_radio')) {
                if (window.addEventListener) {
                    pwd.addEventListener(
                        'focus',
                        function () {
                            s.userTypeHandler('event60');
                        },
                        false
                    );
                } else {
                    pwd.parentNode.attachEvent('onfocus', s.userTypeHandler('event60'));
                }
            }

            newu = document.getElementById('ap_signin_create_radio');
            if (newu) {
                if (window.addEventListener) {
                    newu.addEventListener(
                        'focus',
                        function () {
                            s.userTypeHandler('event61');
                        },
                        false
                    );
                } else {
                    rbn.attachEvent('onfocus', s.userTypeHandler('event61'));
                }
            }
        }
    }
};

s.userTypeHandler = function (evt) {
    var s = this;
    s.events = s.apl(s.events, evt, ',', 2);
    s.linkTrackEvents = s.apl(s.linkTrackEvents, evt, ',', 2);
    s.linkTrackVars = 'events';
    s.tl(true, 'o', 'UserType Selection');
};

s.initRegistration = function () {
    var s = this;

    // prop67 will capture the page that user has initiated signup/signin.
    s.eVar67 = s.prop67 = location.hostname + location.pathname;

    // evar3 will capture the console/registration page that user are trying to navigate.
    s.eVar3 = s.lhref;

    // Logic will decide firing between e61 or e60 based on user's registration status.
    if (aws_sc.registrationStatus !== 'registered') {
        s.prop68 = 'registration init from page: ' + s.pageName;
        s.pageName = 'registration initiated';
        s.events = s.apl(s.events, 'event61', ',', 2);
        s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event61', ',', 2);
    } else {
        s.prop68 = 'Sign-in init from page: ' + s.pageName;
        s.pageName = 'Sign-in initiated';
        s.events = s.apl(s.events, 'event60', ',', 2);
        s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event60', ',', 2);
    }

    s.eVar68 = s.prop68;
    s.linkTrackVars =
        'prop1,prop2,prop4,prop68,eVar68,events,prop67,prop71,prop74,prop75,eVar67,prop41,eVar41,eVar62,prop62,prop61,eVar61,prop39,eVar39,eVar3';
};

// Converts an HTML document link to a download link
s.htmlDocumentHandler = function (href) {
    var s = this;
    s.linkType = 'd';
    s.linkName = this.innerHTML;
    s.awsDownloadLinkHandler(href);
};

// Sets several custom SiteCatalyst variables when a visitor clicks to download a file
s.awsDownloadLinkHandler = function (href) {
    var s = this;

    // Set prop68 & eVar68 to the name of the page the visitor was on when they downloaded a file
    s.prop68 = 'file on page: ' + s.pageName;
    if (s.prop68) {
        s.eVar68 = s.prop68;
    }

    // Set prop72 & eVar72 to the name of the file the visitor downloaded
    s.prop72 = href.substr(href.lastIndexOf('/') + 1);
    s.eVar72 = s.prop72;

    // Set prop73 & eVar73 to the extension of the file the visitor downloaded
    s.prop73 = s.prop72.substr(href.lastIndexOf('.') + 1);
    if (s.prop73) {
        s.eVar73 = s.prop73;
    }

    // Set the events, linkTrackEvents, and linkTrackVars to be sent to SiteCatalyst
    s.events = s.apl(s.events, 'event72', ',', 2);
    s.linkTrackEvents = s.apl(s.linkTrackEvents, 'event72', ',', 2);
    s.linkTrackVars =
        'prop12,prop29,prop39,prop41,prop50,prop61,prop62,prop68,prop72,eVar12,eVar28,eVar29,eVar39,eVar41,eVar50,eVar61,eVar62,eVar68,eVar72,events';
};

/*
 ============== DO NOT ALTER ANYTHING BELOW THIS LINE ! ===============

AppMeasurement for JavaScript version: 1.8.0
Copyright 1996-2016 Adobe, Inc. All Rights Reserved
More info available at http://www.adobe.com/marketing-cloud.html
*/
function AppMeasurement() {
    var a = this;
    a.version = '1.8.0';
    var h = window;
    h.s_c_in || ((h.s_c_il = []), (h.s_c_in = 0));
    a._il = h.s_c_il;
    a._in = h.s_c_in;
    a._il[a._in] = a;
    h.s_c_in++;
    a._c = 's_c';
    // var n = h.AppMeasurement.Ob;
    var n = h.AppMeasurement.Ob;
    n || (n = null);
    var p = h,
        l,
        r;
    try {
        for (
            l = p.parent, r = p.location;
            l &&
            l.location &&
            r &&
            '' + l.location != '' + r &&
            p.location &&
            '' + l.location != '' + p.location &&
            l.location.host == r.host;

        )
            (p = l), (l = p.parent);
    } catch (s) {}
    a.P = function (a) {
        try {
            console.log(a);
        } catch (b) {}
    };
    a.La = function (a) {
        return '' + parseInt(a) == '' + a;
    };
    a.replace = function (a, b, d) {
        return !a || 0 > a.indexOf(b) ? a : a.split(b).join(d);
    };
    a.escape = function (c) {
        var b, d;
        if (!c) return c;
        c = encodeURIComponent(c);
        for (b = 0; 7 > b; b++)
            (d = "+~!*()'".substring(b, b + 1)),
                0 <= c.indexOf(d) &&
                    (c = a.replace(c, d, '%' + d.charCodeAt(0).toString(16).toUpperCase()));
        return c;
    };
    a.unescape = function (c) {
        if (!c) return c;
        c = 0 <= c.indexOf('+') ? a.replace(c, '+', ' ') : c;
        try {
            return decodeURIComponent(c);
        } catch (b) {}
        return unescape(c);
    };
    a.vb = function () {
        var c = h.location.hostname,
            b = a.fpCookieDomainPeriods,
            d;
        b || (b = a.cookieDomainPeriods);
        if (
            c &&
            !a.cookieDomain &&
            !/^[0-9.]+$/.test(c) &&
            ((b = b ? parseInt(b) : 2), (b = 2 < b ? b : 2), (d = c.lastIndexOf('.')), 0 <= d)
        ) {
            for (; 0 <= d && 1 < b; ) (d = c.lastIndexOf('.', d - 1)), b--;
            a.cookieDomain = 0 < d ? c.substring(d) : c;
        }
        return a.cookieDomain;
    };
    a.c_r = a.cookieRead = function (c) {
        c = a.escape(c);
        var b = ' ' + a.d.cookie,
            d = b.indexOf(' ' + c + '='),
            f = 0 > d ? d : b.indexOf(';', d);
        c = 0 > d ? '' : a.unescape(b.substring(d + 2 + c.length, 0 > f ? b.length : f));
        return '[[B]]' != c ? c : '';
    };
    a.c_w = a.cookieWrite = function (c, b, d) {
        var f = a.vb(),
            e = a.cookieLifetime,
            g;
        b = '' + b;
        e = e ? ('' + e).toUpperCase() : '';
        d &&
            'SESSION' != e &&
            'NONE' != e &&
            ((g = '' != b ? parseInt(e ? e : 0) : -60)
                ? ((d = new Date()), d.setTime(d.getTime() + 1e3 * g))
                : 1 == d &&
                  ((d = new Date()), (g = d.getYear()), d.setYear(g + 5 + (1900 > g ? 1900 : 0))));
        return c && 'NONE' != e
            ? ((a.d.cookie =
                  a.escape(c) +
                  '=' +
                  a.escape('' != b ? b : '[[B]]') +
                  '; path=/;' +
                  (d && 'SESSION' != e ? ' expires=' + d.toGMTString() + ';' : '') +
                  (f ? ' domain=' + f + ';' : '')),
              a.cookieRead(c) == b)
            : 0;
    };
    a.K = [];
    a.ia = function (c, b, d) {
        if (a.Ea) return 0;
        a.maxDelay || (a.maxDelay = 250);
        var f = 0,
            e = new Date().getTime() + a.maxDelay,
            g = a.d.visibilityState,
            k = ['webkitvisibilitychange', 'visibilitychange'];
        g || (g = a.d.webkitVisibilityState);
        if (g && 'prerender' == g) {
            if (!a.ja)
                for (a.ja = 1, d = 0; d < k.length; d++)
                    a.d.addEventListener(k[d], function () {
                        var c = a.d.visibilityState;
                        c || (c = a.d.webkitVisibilityState);
                        'visible' == c && ((a.ja = 0), a.delayReady());
                    });
            f = 1;
            e = 0;
        } else d || (a.p('_d') && (f = 1));
        f && (a.K.push({ m: c, a: b, t: e }), a.ja || setTimeout(a.delayReady, a.maxDelay));
        return f;
    };
    a.delayReady = function () {
        var c = new Date().getTime(),
            b = 0,
            d;
        for (a.p('_d') ? (b = 1) : a.xa(); 0 < a.K.length; ) {
            d = a.K.shift();
            if (b && !d.t && d.t > c) {
                a.K.unshift(d);
                setTimeout(a.delayReady, parseInt(a.maxDelay / 2));
                break;
            }
            a.Ea = 1;
            a[d.m].apply(a, d.a);
            a.Ea = 0;
        }
    };
    a.setAccount = a.sa = function (c) {
        var b, d;
        if (!a.ia('setAccount', arguments))
            if (((a.account = c), a.allAccounts))
                for (
                    b = a.allAccounts.concat(c.split(',')), a.allAccounts = [], b.sort(), d = 0;
                    d < b.length;
                    d++
                )
                    (0 != d && b[d - 1] == b[d]) || a.allAccounts.push(b[d]);
            else a.allAccounts = c.split(',');
    };
    a.foreachVar = function (c, b) {
        var d,
            f,
            e,
            g,
            k = '';
        e = f = '';
        if (a.lightProfileID)
            (d = a.O), (k = a.lightTrackVars) && (k = ',' + k + ',' + a.na.join(',') + ',');
        else {
            d = a.g;
            if (a.pe || a.linkType)
                (k = a.linkTrackVars),
                    (f = a.linkTrackEvents),
                    a.pe &&
                        ((e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1)),
                        a[e] && ((k = a[e].Mb), (f = a[e].Lb)));
            k && (k = ',' + k + ',' + a.G.join(',') + ',');
            f && k && (k += ',events,');
        }
        b && (b = ',' + b + ',');
        for (f = 0; f < d.length; f++)
            (e = d[f]),
                (g = a[e]) &&
                    (!k || 0 <= k.indexOf(',' + e + ',')) &&
                    (!b || 0 <= b.indexOf(',' + e + ',')) &&
                    c(e, g);
    };
    a.r = function (c, b, d, f, e) {
        var g = '',
            k,
            m,
            h,
            t,
            l = 0;
        'contextData' == c && (c = 'c');
        if (b) {
            for (k in b)
                if (
                    !(Object.prototype[k] || (e && k.substring(0, e.length) != e)) &&
                    b[k] &&
                    (!d || 0 <= d.indexOf(',' + (f ? f + '.' : '') + k + ','))
                ) {
                    h = !1;
                    if (l)
                        for (m = 0; m < l.length; m++)
                            k.substring(0, l[m].length) == l[m] && (h = !0);
                    if (
                        !h &&
                        ('' == g && (g += '&' + c + '.'),
                        (m = b[k]),
                        e && (k = k.substring(e.length)),
                        0 < k.length)
                    )
                        if (((h = k.indexOf('.')), 0 < h))
                            (m = k.substring(0, h)),
                                (h = (e ? e : '') + m + '.'),
                                l || (l = []),
                                l.push(h),
                                (g += a.r(m, b, d, f, h));
                        else if (('boolean' == typeof m && (m = m ? 'true' : 'false'), m)) {
                            if ('retrieveLightData' == f && 0 > e.indexOf('.contextData.'))
                                switch (((h = k.substring(0, 4)), (t = k.substring(4)), k)) {
                                    case 'transactionID':
                                        k = 'xact';
                                        break;
                                    case 'channel':
                                        k = 'ch';
                                        break;
                                    case 'campaign':
                                        k = 'v0';
                                        break;
                                    default:
                                        a.La(t) &&
                                            ('prop' == h
                                                ? (k = 'c' + t)
                                                : 'eVar' == h
                                                ? (k = 'v' + t)
                                                : 'list' == h
                                                ? (k = 'l' + t)
                                                : 'hier' == h &&
                                                  ((k = 'h' + t), (m = m.substring(0, 255))));
                                }
                            g += '&' + a.escape(k) + '=' + a.escape(m);
                        }
                }
            '' != g && (g += '&.' + c);
        }
        return g;
    };
    a.usePostbacks = 0;
    a.yb = function () {
        var c = '',
            b,
            d,
            f,
            e,
            g,
            k,
            m,
            h,
            l = '',
            p = '',
            q = (e = '');
        if (a.lightProfileID)
            (b = a.O), (l = a.lightTrackVars) && (l = ',' + l + ',' + a.na.join(',') + ',');
        else {
            b = a.g;
            if (a.pe || a.linkType)
                (l = a.linkTrackVars),
                    (p = a.linkTrackEvents),
                    a.pe &&
                        ((e = a.pe.substring(0, 1).toUpperCase() + a.pe.substring(1)),
                        a[e] && ((l = a[e].Mb), (p = a[e].Lb)));
            l && (l = ',' + l + ',' + a.G.join(',') + ',');
            p && ((p = ',' + p + ','), l && (l += ',events,'));
            a.events2 && (q += ('' != q ? ',' : '') + a.events2);
        }
        if (a.visitor && a.visitor.getCustomerIDs) {
            e = n;
            if ((g = a.visitor.getCustomerIDs()))
                for (d in g)
                    Object.prototype[d] ||
                        ((f = g[d]),
                        'object' == typeof f &&
                            (e || (e = {}),
                            f.id && (e[d + '.id'] = f.id),
                            f.authState && (e[d + '.as'] = f.authState)));
            e && (c += a.r('cid', e));
        }
        a.AudienceManagement &&
            a.AudienceManagement.isReady() &&
            (c += a.r('d', a.AudienceManagement.getEventCallConfigParams()));
        for (d = 0; d < b.length; d++) {
            e = b[d];
            g = a[e];
            f = e.substring(0, 4);
            k = e.substring(4);
            !g && 'events' == e && q && ((g = q), (q = ''));
            if (g && (!l || 0 <= l.indexOf(',' + e + ','))) {
                switch (e) {
                    case 'supplementalDataID':
                        e = 'sdid';
                        break;
                    case 'timestamp':
                        e = 'ts';
                        break;
                    case 'dynamicVariablePrefix':
                        e = 'D';
                        break;
                    case 'visitorID':
                        e = 'vid';
                        break;
                    case 'marketingCloudVisitorID':
                        e = 'mid';
                        break;
                    case 'analyticsVisitorID':
                        e = 'aid';
                        break;
                    case 'audienceManagerLocationHint':
                        e = 'aamlh';
                        break;
                    case 'audienceManagerBlob':
                        e = 'aamb';
                        break;
                    case 'authState':
                        e = 'as';
                        break;
                    case 'pageURL':
                        e = 'g';
                        255 < g.length &&
                            ((a.pageURLRest = g.substring(255)), (g = g.substring(0, 255)));
                        break;
                    case 'pageURLRest':
                        e = '-g';
                        break;
                    case 'referrer':
                        e = 'r';
                        break;
                    case 'vmk':
                    case 'visitorMigrationKey':
                        e = 'vmt';
                        break;
                    case 'visitorMigrationServer':
                        e = 'vmf';
                        a.ssl && a.visitorMigrationServerSecure && (g = '');
                        break;
                    case 'visitorMigrationServerSecure':
                        e = 'vmf';
                        !a.ssl && a.visitorMigrationServer && (g = '');
                        break;
                    case 'charSet':
                        e = 'ce';
                        break;
                    case 'visitorNamespace':
                        e = 'ns';
                        break;
                    case 'cookieDomainPeriods':
                        e = 'cdp';
                        break;
                    case 'cookieLifetime':
                        e = 'cl';
                        break;
                    case 'variableProvider':
                        e = 'vvp';
                        break;
                    case 'currencyCode':
                        e = 'cc';
                        break;
                    case 'channel':
                        e = 'ch';
                        break;
                    case 'transactionID':
                        e = 'xact';
                        break;
                    case 'campaign':
                        e = 'v0';
                        break;
                    case 'latitude':
                        e = 'lat';
                        break;
                    case 'longitude':
                        e = 'lon';
                        break;
                    case 'resolution':
                        e = 's';
                        break;
                    case 'colorDepth':
                        e = 'c';
                        break;
                    case 'javascriptVersion':
                        e = 'j';
                        break;
                    case 'javaEnabled':
                        e = 'v';
                        break;
                    case 'cookiesEnabled':
                        e = 'k';
                        break;
                    case 'browserWidth':
                        e = 'bw';
                        break;
                    case 'browserHeight':
                        e = 'bh';
                        break;
                    case 'connectionType':
                        e = 'ct';
                        break;
                    case 'homepage':
                        e = 'hp';
                        break;
                    case 'events':
                        q && (g += ('' != g ? ',' : '') + q);
                        if (p)
                            for (k = g.split(','), g = '', f = 0; f < k.length; f++)
                                (m = k[f]),
                                    (h = m.indexOf('=')),
                                    0 <= h && (m = m.substring(0, h)),
                                    (h = m.indexOf(':')),
                                    0 <= h && (m = m.substring(0, h)),
                                    0 <= p.indexOf(',' + m + ',') && (g += (g ? ',' : '') + k[f]);
                        break;
                    case 'events2':
                        g = '';
                        break;
                    case 'contextData':
                        c += a.r('c', a[e], l, e);
                        g = '';
                        break;
                    case 'lightProfileID':
                        e = 'mtp';
                        break;
                    case 'lightStoreForSeconds':
                        e = 'mtss';
                        a.lightProfileID || (g = '');
                        break;
                    case 'lightIncrementBy':
                        e = 'mti';
                        a.lightProfileID || (g = '');
                        break;
                    case 'retrieveLightProfiles':
                        e = 'mtsr';
                        break;
                    case 'deleteLightProfiles':
                        e = 'mtsd';
                        break;
                    case 'retrieveLightData':
                        a.retrieveLightProfiles && (c += a.r('mts', a[e], l, e));
                        g = '';
                        break;
                    default:
                        a.La(k) &&
                            ('prop' == f
                                ? (e = 'c' + k)
                                : 'eVar' == f
                                ? (e = 'v' + k)
                                : 'list' == f
                                ? (e = 'l' + k)
                                : 'hier' == f && ((e = 'h' + k), (g = g.substring(0, 255))));
                }
                g && (c += '&' + e + '=' + ('pev' != e.substring(0, 3) ? a.escape(g) : g));
            }
            'pev3' == e && a.e && (c += a.e);
        }
        return c;
    };
    a.D = function (a) {
        var b = a.tagName;
        if (
            'undefined' != '' + a.Rb ||
            ('undefined' != '' + a.Hb && 'HTML' != ('' + a.Hb).toUpperCase())
        )
            return '';
        b = b && b.toUpperCase ? b.toUpperCase() : '';
        'SHAPE' == b && (b = '');
        b &&
            (('INPUT' == b || 'BUTTON' == b) && a.type && a.type.toUpperCase
                ? (b = a.type.toUpperCase())
                : !b && a.href && (b = 'A'));
        return b;
    };
    a.Ha = function (a) {
        var b = h.location,
            d = a.href ? a.href : '',
            f,
            e,
            g;
        f = d.indexOf(':');
        e = d.indexOf('?');
        g = d.indexOf('/');
        d &&
            (0 > f || (0 <= e && f > e) || (0 <= g && f > g)) &&
            ((e = a.protocol && 1 < a.protocol.length ? a.protocol : b.protocol ? b.protocol : ''),
            (f = b.pathname.lastIndexOf('/')),
            (d =
                (e ? e + '//' : '') +
                (a.host ? a.host : b.host ? b.host : '') +
                ('/' != d.substring(0, 1) ? b.pathname.substring(0, 0 > f ? 0 : f) + '/' : '') +
                d));
        return d;
    };
    a.L = function (c) {
        var b = a.D(c),
            d,
            f,
            e = '',
            g = 0;
        return b &&
            ((d = c.protocol),
            (f = c.onclick),
            !c.href ||
            ('A' != b && 'AREA' != b) ||
            (f && d && !(0 > d.toLowerCase().indexOf('javascript')))
                ? f
                    ? ((e = a.replace(
                          a.replace(a.replace(a.replace('' + f, '\r', ''), '\n', ''), '\t', ''),
                          ' ',
                          ''
                      )),
                      (g = 2))
                    : 'INPUT' == b || 'SUBMIT' == b
                    ? (c.value
                          ? (e = c.value)
                          : c.innerText
                          ? (e = c.innerText)
                          : c.textContent && (e = c.textContent),
                      (g = 3))
                    : 'IMAGE' == b && c.src && (e = c.src)
                : (e = a.Ha(c)),
            e)
            ? { id: e.substring(0, 100), type: g }
            : 0;
    };
    a.Pb = function (c) {
        for (var b = a.D(c), d = a.L(c); c && !d && 'BODY' != b; )
            if ((c = c.parentElement ? c.parentElement : c.parentNode)) (b = a.D(c)), (d = a.L(c));
        (d && 'BODY' != b) || (c = 0);
        c &&
            ((b = c.onclick ? '' + c.onclick : ''),
            0 <= b.indexOf('.tl(') || 0 <= b.indexOf('.trackLink(')) &&
            (c = 0);
        return c;
    };
    a.Gb = function () {
        var c,
            b,
            d = a.linkObject,
            f = a.linkType,
            e = a.linkURL,
            g,
            k;
        a.oa = 1;
        d || ((a.oa = 0), (d = a.clickObject));
        if (d) {
            c = a.D(d);
            for (b = a.L(d); d && !b && 'BODY' != c; )
                if ((d = d.parentElement ? d.parentElement : d.parentNode))
                    (c = a.D(d)), (b = a.L(d));
            (b && 'BODY' != c) || (d = 0);
            if (d && !a.linkObject) {
                var m = d.onclick ? '' + d.onclick : '';
                if (0 <= m.indexOf('.tl(') || 0 <= m.indexOf('.trackLink(')) d = 0;
            }
        } else a.oa = 1;
        !e && d && (e = a.Ha(d));
        e && !a.linkLeaveQueryString && ((g = e.indexOf('?')), 0 <= g && (e = e.substring(0, g)));
        if (!f && e) {
            var l = 0,
                p = 0,
                n;
            if (a.trackDownloadLinks && a.linkDownloadFileTypes)
                for (
                    m = e.toLowerCase(),
                        g = m.indexOf('?'),
                        k = m.indexOf('#'),
                        0 <= g ? 0 <= k && k < g && (g = k) : (g = k),
                        0 <= g && (m = m.substring(0, g)),
                        g = a.linkDownloadFileTypes.toLowerCase().split(','),
                        k = 0;
                    k < g.length;
                    k++
                )
                    (n = g[k]) && m.substring(m.length - (n.length + 1)) == '.' + n && (f = 'd');
            if (
                a.trackExternalLinks &&
                !f &&
                ((m = e.toLowerCase()),
                a.Ka(m) &&
                    (a.linkInternalFilters || (a.linkInternalFilters = h.location.hostname),
                    (g = 0),
                    a.linkExternalFilters
                        ? ((g = a.linkExternalFilters.toLowerCase().split(',')), (l = 1))
                        : a.linkInternalFilters &&
                          (g = a.linkInternalFilters.toLowerCase().split(',')),
                    g))
            ) {
                for (k = 0; k < g.length; k++) (n = g[k]), 0 <= m.indexOf(n) && (p = 1);
                p ? l && (f = 'e') : l || (f = 'e');
            }
        }
        a.linkObject = d;
        a.linkURL = e;
        a.linkType = f;
        if (a.trackClickMap || a.trackInlineStats)
            (a.e = ''),
                d &&
                    ((f = a.pageName),
                    (e = 1),
                    (d = d.sourceIndex),
                    f || ((f = a.pageURL), (e = 0)),
                    h.s_objectID && ((b.id = h.s_objectID), (d = b.type = 1)),
                    f &&
                        b &&
                        b.id &&
                        c &&
                        (a.e =
                            '&pid=' +
                            a.escape(f.substring(0, 255)) +
                            (e ? '&pidt=' + e : '') +
                            '&oid=' +
                            a.escape(b.id.substring(0, 100)) +
                            (b.type ? '&oidt=' + b.type : '') +
                            '&ot=' +
                            c +
                            (d ? '&oi=' + d : '')));
    };
    a.zb = function () {
        var c = a.oa,
            b = a.linkType,
            d = a.linkURL,
            f = a.linkName;
        b &&
            (d || f) &&
            ((b = b.toLowerCase()),
            'd' != b && 'e' != b && (b = 'o'),
            (a.pe = 'lnk_' + b),
            (a.pev1 = d ? a.escape(d) : ''),
            (a.pev2 = f ? a.escape(f) : ''),
            (c = 1));
        a.abort && (c = 0);
        if (a.trackClickMap || a.trackInlineStats || a.ActivityMap) {
            var b = {},
                d = 0,
                e = a.cookieRead('s_sq'),
                g = e ? e.split('&') : 0,
                k,
                m,
                h,
                e = 0;
            if (g)
                for (k = 0; k < g.length; k++)
                    (m = g[k].split('=')),
                        (f = a.unescape(m[0]).split(',')),
                        (m = a.unescape(m[1])),
                        (b[m] = f);
            f = a.account.split(',');
            k = {};
            for (h in a.contextData)
                h &&
                    !Object.prototype[h] &&
                    'a.activitymap.' == h.substring(0, 14) &&
                    ((k[h] = a.contextData[h]), (a.contextData[h] = ''));
            a.e = a.r('c', k) + (a.e ? a.e : '');
            if (c || a.e) {
                c && !a.e && (e = 1);
                for (m in b)
                    if (!Object.prototype[m])
                        for (h = 0; h < f.length; h++)
                            for (
                                e &&
                                    ((g = b[m].join(',')),
                                    g == a.account &&
                                        ((a.e += ('&' != m.charAt(0) ? '&' : '') + m),
                                        (b[m] = []),
                                        (d = 1))),
                                    k = 0;
                                k < b[m].length;
                                k++
                            )
                                (g = b[m][k]),
                                    g == f[h] &&
                                        (e &&
                                            (a.e +=
                                                '&u=' +
                                                a.escape(g) +
                                                ('&' != m.charAt(0) ? '&' : '') +
                                                m +
                                                '&u=0'),
                                        b[m].splice(k, 1),
                                        (d = 1));
                c || (d = 1);
                if (d) {
                    e = '';
                    k = 2;
                    !c && a.e && ((e = a.escape(f.join(',')) + '=' + a.escape(a.e)), (k = 1));
                    for (m in b)
                        !Object.prototype[m] &&
                            0 < k &&
                            0 < b[m].length &&
                            ((e += (e ? '&' : '') + a.escape(b[m].join(',')) + '=' + a.escape(m)),
                            k--);
                    a.cookieWrite('s_sq', e);
                }
            }
        }
        return c;
    };
    a.Ab = function () {
        if (!a.Kb) {
            var c = new Date(),
                b = p.location,
                d,
                f,
                e = (f = d = ''),
                g = '',
                k = '',
                h = '1.2',
                l = a.cookieWrite('s_cc', 'true', 0) ? 'Y' : 'N',
                n = '',
                q = '';
            if (
                c.setUTCDate &&
                ((h = '1.3'), (0).toPrecision && ((h = '1.5'), (c = []), c.forEach))
            ) {
                h = '1.6';
                f = 0;
                d = {};
                try {
                    (f = new Iterator(d)),
                        f.next &&
                            ((h = '1.7'),
                            c.reduce &&
                                ((h = '1.8'),
                                h.trim &&
                                    ((h = '1.8.1'),
                                    Date.parse &&
                                        ((h = '1.8.2'), Object.create && (h = '1.8.5')))));
                } catch (r) {}
            }
            d = screen.width + 'x' + screen.height;
            e = navigator.javaEnabled() ? 'Y' : 'N';
            f = screen.pixelDepth ? screen.pixelDepth : screen.colorDepth;
            g = a.w.innerWidth ? a.w.innerWidth : a.d.documentElement.offsetWidth;
            k = a.w.innerHeight ? a.w.innerHeight : a.d.documentElement.offsetHeight;
            try {
                a.b.addBehavior('#default#homePage'), (n = a.b.Qb(b) ? 'Y' : 'N');
            } catch (s) {}
            try {
                a.b.addBehavior('#default#clientCaps'), (q = a.b.connectionType);
            } catch (u) {}
            a.resolution = d;
            a.colorDepth = f;
            a.javascriptVersion = h;
            a.javaEnabled = e;
            a.cookiesEnabled = l;
            a.browserWidth = g;
            a.browserHeight = k;
            a.connectionType = q;
            a.homepage = n;
            a.Kb = 1;
        }
    };
    a.Q = {};
    a.loadModule = function (c, b) {
        var d = a.Q[c];
        if (!d) {
            d = h['AppMeasurement_Module_' + c] ? new h['AppMeasurement_Module_' + c](a) : {};
            a.Q[c] = a[c] = d;
            d.cb = function () {
                return d.hb;
            };
            d.ib = function (b) {
                if ((d.hb = b)) (a[c + '_onLoad'] = b), a.ia(c + '_onLoad', [a, d], 1) || b(a, d);
            };
            try {
                Object.defineProperty
                    ? Object.defineProperty(d, 'onLoad', { get: d.cb, set: d.ib })
                    : (d._olc = 1);
            } catch (f) {
                d._olc = 1;
            }
        }
        b && ((a[c + '_onLoad'] = b), a.ia(c + '_onLoad', [a, d], 1) || b(a, d));
    };
    a.p = function (c) {
        var b, d;
        for (b in a.Q)
            if (
                !Object.prototype[b] &&
                (d = a.Q[b]) &&
                (d._olc && d.onLoad && ((d._olc = 0), d.onLoad(a, d)), d[c] && d[c]())
            )
                return 1;
        return 0;
    };
    a.Cb = function () {
        var c = Math.floor(1e13 * Math.random()),
            b = a.visitorSampling,
            d = a.visitorSamplingGroup,
            d =
                's_vsn_' +
                (a.visitorNamespace ? a.visitorNamespace : a.account) +
                (d ? '_' + d : ''),
            f = a.cookieRead(d);
        if (b) {
            b *= 100;
            f && (f = parseInt(f));
            if (!f) {
                if (!a.cookieWrite(d, c)) return 0;
                f = c;
            }
            if (f % 1e4 > b) return 0;
        }
        return 1;
    };
    a.R = function (c, b) {
        var d, f, e, g, k, h;
        for (d = 0; 2 > d; d++)
            for (f = 0 < d ? a.Aa : a.g, e = 0; e < f.length; e++)
                if (((g = f[e]), (k = c[g]) || c['!' + g])) {
                    if (!b && ('contextData' == g || 'retrieveLightData' == g) && a[g])
                        for (h in a[g]) k[h] || (k[h] = a[g][h]);
                    a[g] = k;
                }
    };
    a.Ua = function (c, b) {
        var d, f, e, g;
        for (d = 0; 2 > d; d++)
            for (f = 0 < d ? a.Aa : a.g, e = 0; e < f.length; e++)
                (g = f[e]), (c[g] = a[g]), b || c[g] || (c['!' + g] = 1);
    };
    a.ub = function (a) {
        var b,
            d,
            f,
            e,
            g,
            k = 0,
            h,
            l = '',
            n = '';
        if (
            a &&
            255 < a.length &&
            ((b = '' + a),
            (d = b.indexOf('?')),
            0 < d &&
                ((h = b.substring(d + 1)),
                (b = b.substring(0, d)),
                (e = b.toLowerCase()),
                (f = 0),
                'https://' == e.substring(0, 8) && (f += 8),
                (d = e.indexOf('/', f)),
                0 < d &&
                    ((e = e.substring(f, d)),
                    (g = b.substring(d)),
                    (b = b.substring(0, d)),
                    0 <= e.indexOf('google')
                        ? (k = ',q,ie,start,search_key,word,kw,cd,')
                        : 0 <= e.indexOf('yahoo.co') && (k = ',p,ei,'),
                    k && h)))
        ) {
            if ((a = h.split('&')) && 1 < a.length) {
                for (f = 0; f < a.length; f++)
                    (e = a[f]),
                        (d = e.indexOf('=')),
                        0 < d && 0 <= k.indexOf(',' + e.substring(0, d) + ',')
                            ? (l += (l ? '&' : '') + e)
                            : (n += (n ? '&' : '') + e);
                l && n ? (h = l + '&' + n) : (n = '');
            }
            d = 253 - (h.length - n.length) - b.length;
            a = b + (0 < d ? g.substring(0, d) : '') + '?' + h;
        }
        return a;
    };
    a.$a = function (c) {
        var b = a.d.visibilityState,
            d = ['webkitvisibilitychange', 'visibilitychange'];
        b || (b = a.d.webkitVisibilityState);
        if (b && 'prerender' == b) {
            if (c)
                for (b = 0; b < d.length; b++)
                    a.d.addEventListener(d[b], function () {
                        var b = a.d.visibilityState;
                        b || (b = a.d.webkitVisibilityState);
                        'visible' == b && c();
                    });
            return !1;
        }
        return !0;
    };
    a.ea = !1;
    a.I = !1;
    a.kb = function () {
        a.I = !0;
        a.j();
    };
    a.ca = !1;
    a.V = !1;
    a.gb = function (c) {
        a.marketingCloudVisitorID = c;
        a.V = !0;
        a.j();
    };
    a.fa = !1;
    a.W = !1;
    a.lb = function (c) {
        a.visitorOptedOut = c;
        a.W = !0;
        a.j();
    };
    a.Z = !1;
    a.S = !1;
    a.Wa = function (c) {
        a.analyticsVisitorID = c;
        a.S = !0;
        a.j();
    };
    a.ba = !1;
    a.U = !1;
    a.Ya = function (c) {
        a.audienceManagerLocationHint = c;
        a.U = !0;
        a.j();
    };
    a.aa = !1;
    a.T = !1;
    a.Xa = function (c) {
        a.audienceManagerBlob = c;
        a.T = !0;
        a.j();
    };
    a.Za = function (c) {
        a.maxDelay || (a.maxDelay = 250);
        return a.p('_d')
            ? (c &&
                  setTimeout(function () {
                      c();
                  }, a.maxDelay),
              !1)
            : !0;
    };
    a.da = !1;
    a.H = !1;
    a.xa = function () {
        a.H = !0;
        a.j();
    };
    a.isReadyToTrack = function () {
        var c = !0,
            b = a.visitor,
            d,
            f,
            e;
        a.ea || a.I || (a.$a(a.kb) ? (a.I = !0) : (a.ea = !0));
        if (a.ea && !a.I) return !1;
        b &&
            b.isAllowed() &&
            (a.ca ||
                a.marketingCloudVisitorID ||
                !b.getMarketingCloudVisitorID ||
                ((a.ca = !0),
                (a.marketingCloudVisitorID = b.getMarketingCloudVisitorID([a, a.gb])),
                a.marketingCloudVisitorID && (a.V = !0)),
            a.fa ||
                a.visitorOptedOut ||
                !b.isOptedOut ||
                ((a.fa = !0),
                (a.visitorOptedOut = b.isOptedOut([a, a.lb])),
                a.visitorOptedOut != n && (a.W = !0)),
            a.Z ||
                a.analyticsVisitorID ||
                !b.getAnalyticsVisitorID ||
                ((a.Z = !0),
                (a.analyticsVisitorID = b.getAnalyticsVisitorID([a, a.Wa])),
                a.analyticsVisitorID && (a.S = !0)),
            a.ba ||
                a.audienceManagerLocationHint ||
                !b.getAudienceManagerLocationHint ||
                ((a.ba = !0),
                (a.audienceManagerLocationHint = b.getAudienceManagerLocationHint([a, a.Ya])),
                a.audienceManagerLocationHint && (a.U = !0)),
            a.aa ||
                a.audienceManagerBlob ||
                !b.getAudienceManagerBlob ||
                ((a.aa = !0),
                (a.audienceManagerBlob = b.getAudienceManagerBlob([a, a.Xa])),
                a.audienceManagerBlob && (a.T = !0)),
            (c = a.ca && !a.V && !a.marketingCloudVisitorID),
            (b = a.Z && !a.S && !a.analyticsVisitorID),
            (d = a.ba && !a.U && !a.audienceManagerLocationHint),
            (f = a.aa && !a.T && !a.audienceManagerBlob),
            (e = a.fa && !a.W),
            (c = c || b || d || f || e ? !1 : !0));
        a.da || a.H || (a.Za(a.xa) ? (a.H = !0) : (a.da = !0));
        a.da && !a.H && (c = !1);
        return c;
    };
    a.o = n;
    a.u = 0;
    a.callbackWhenReadyToTrack = function (c, b, d) {
        var f;
        f = {};
        f.pb = c;
        f.ob = b;
        f.mb = d;
        a.o == n && (a.o = []);
        a.o.push(f);
        0 == a.u && (a.u = setInterval(a.j, 100));
    };
    a.j = function () {
        var c;
        if (a.isReadyToTrack() && (a.jb(), a.o != n))
            for (; 0 < a.o.length; ) (c = a.o.shift()), c.ob.apply(c.pb, c.mb);
    };
    a.jb = function () {
        a.u && (clearInterval(a.u), (a.u = 0));
    };
    a.eb = function (c) {
        var b,
            d,
            f = n,
            e = n;
        if (!a.isReadyToTrack()) {
            b = [];
            if (c != n) for (d in ((f = {}), c)) f[d] = c[d];
            e = {};
            a.Ua(e, !0);
            b.push(f);
            b.push(e);
            a.callbackWhenReadyToTrack(a, a.track, b);
            return !0;
        }
        return !1;
    };
    a.wb = function () {
        var c = a.cookieRead('s_fid'),
            b = '',
            d = '',
            f;
        f = 8;
        var e = 4;
        if (!c || 0 > c.indexOf('-')) {
            for (c = 0; 16 > c; c++)
                (f = Math.floor(Math.random() * f)),
                    (b += '0123456789ABCDEF'.substring(f, f + 1)),
                    (f = Math.floor(Math.random() * e)),
                    (d += '0123456789ABCDEF'.substring(f, f + 1)),
                    (f = e = 16);
            c = b + '-' + d;
        }
        a.cookieWrite('s_fid', c, 1) || (c = 0);
        return c;
    };
    a.t = a.track = function (c, b) {
        var d,
            f = new Date(),
            e = 's' + (Math.floor(f.getTime() / 108e5) % 10) + Math.floor(1e13 * Math.random()),
            g = f.getYear(),
            g =
                't=' +
                a.escape(
                    f.getDate() +
                        '/' +
                        f.getMonth() +
                        '/' +
                        (1900 > g ? g + 1900 : g) +
                        ' ' +
                        f.getHours() +
                        ':' +
                        f.getMinutes() +
                        ':' +
                        f.getSeconds() +
                        ' ' +
                        f.getDay() +
                        ' ' +
                        f.getTimezoneOffset()
                );
        a.visitor && a.visitor.getAuthState && (a.authState = a.visitor.getAuthState());
        a.p('_s');
        a.eb(c) ||
            (b && a.R(b),
            c && ((d = {}), a.Ua(d, 0), a.R(c)),
            a.Cb() &&
                !a.visitorOptedOut &&
                (a.analyticsVisitorID || a.marketingCloudVisitorID || (a.fid = a.wb()),
                a.Gb(),
                a.usePlugins && a.doPlugins && a.doPlugins(a),
                a.account &&
                    (a.abort ||
                        (a.visitor &&
                            !a.supplementalDataID &&
                            a.visitor.getSupplementalDataID &&
                            (a.supplementalDataID = a.visitor.getSupplementalDataID(
                                'AppMeasurement:' + a._in,
                                a.expectSupplementalData ? !1 : !0
                            )),
                        a.trackOffline &&
                            !a.timestamp &&
                            (a.timestamp = Math.floor(f.getTime() / 1e3)),
                        (f = h.location),
                        a.pageURL || (a.pageURL = f.href ? f.href : f),
                        a.referrer || a.Va || (a.referrer = p.document.referrer),
                        (a.Va = 1),
                        (a.referrer = a.ub(a.referrer)),
                        a.p('_g')),
                    a.zb() &&
                        !a.abort &&
                        (a.Ab(), (g += a.yb()), a.Fb(e, g), a.p('_t'), (a.referrer = '')))),
            c && a.R(d, 1));
        a.abort = a.supplementalDataID = a.timestamp = a.pageURLRest = a.linkObject = a.clickObject = a.linkURL = a.linkName = a.linkType = h.s_objectID = a.pe = a.pev1 = a.pev2 = a.pev3 = a.e = a.lightProfileID = 0;
    };
    a.za = [];
    a.registerPreTrackCallback = function (c) {
        for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
        'function' == typeof c
            ? a.za.push([c, b])
            : a.debugTracking && a.P('DEBUG: Non function type passed to registerPreTrackCallback');
    };
    a.bb = function (c) {
        a.wa(a.za, c);
    };
    a.ya = [];
    a.registerPostTrackCallback = function (c) {
        for (var b = [], d = 1; d < arguments.length; d++) b.push(arguments[d]);
        'function' == typeof c
            ? a.ya.push([c, b])
            : a.debugTracking &&
              a.P('DEBUG: Non function type passed to registerPostTrackCallback');
    };
    a.ab = function (c) {
        a.wa(a.ya, c);
    };
    a.wa = function (c, b) {
        if ('object' == typeof c)
            for (var d = 0; d < c.length; d++) {
                var f = c[d][0],
                    e = c[d][1];
                e.unshift(b);
                if ('function' == typeof f)
                    try {
                        f.apply(null, e);
                    } catch (g) {
                        a.debugTracking && a.P(g.message);
                    }
            }
    };
    a.tl = a.trackLink = function (c, b, d, f, e) {
        a.linkObject = c;
        a.linkType = b;
        a.linkName = d;
        e && ((a.l = c), (a.A = e));
        return a.track(f);
    };
    a.trackLight = function (c, b, d, f) {
        a.lightProfileID = c;
        a.lightStoreForSeconds = b;
        a.lightIncrementBy = d;
        return a.track(f);
    };
    a.clearVars = function () {
        var c, b;
        for (c = 0; c < a.g.length; c++)
            if (
                ((b = a.g[c]),
                'prop' == b.substring(0, 4) ||
                    'eVar' == b.substring(0, 4) ||
                    'hier' == b.substring(0, 4) ||
                    'list' == b.substring(0, 4) ||
                    'channel' == b ||
                    'events' == b ||
                    'eventList' == b ||
                    'products' == b ||
                    'productList' == b ||
                    'purchaseID' == b ||
                    'transactionID' == b ||
                    'state' == b ||
                    'zip' == b ||
                    'campaign' == b)
            )
                a[b] = void 0;
    };
    a.tagContainerMarker = '';
    a.Fb = function (c, b) {
        var d,
            f = a.trackingServer;
        d = '';
        var e = a.dc,
            g = 'sc.',
            h = a.visitorNamespace;
        f
            ? a.trackingServerSecure && a.ssl && (f = a.trackingServerSecure)
            : (h ||
                  ((h = a.account),
                  (f = h.indexOf(',')),
                  0 <= f && (h = h.substring(0, f)),
                  (h = h.replace(/[^A-Za-z0-9]/g, ''))),
              d || (d = '2o7.net'),
              (e = e ? ('' + e).toLowerCase() : 'd1'),
              '2o7.net' == d && ('d1' == e ? (e = '112') : 'd2' == e && (e = '122'), (g = '')),
              (f = h + '.' + e + '.' + g + d));
        d = a.ssl ? 'https://' : 'http://';
        e = (a.AudienceManagement && a.AudienceManagement.isReady()) || 0 != a.usePostbacks;
        d +=
            f +
            '/b/ss/' +
            a.account +
            '/' +
            (a.mobile ? '5.' : '') +
            (e ? '10' : '1') +
            '/JS-' +
            a.version +
            (a.Jb ? 'T' : '') +
            (a.tagContainerMarker ? '-' + a.tagContainerMarker : '') +
            '/' +
            c +
            '?AQB=1&ndh=1&pf=1&' +
            (e ? 'callback=s_c_il[' + a._in + '].doPostbacks&et=1&' : '') +
            b +
            '&AQE=1';
        a.bb(d);
        a.sb(d);
        a.ka();
    };
    a.Ta = /{(%?)(.*?)(%?)}/;
    a.Nb = RegExp(a.Ta.source, 'g');
    a.tb = function (c) {
        if ('object' == typeof c.dests)
            for (var b = 0; b < c.dests.length; ++b) {
                var d = c.dests[b];
                if ('string' == typeof d.c && 'aa.' == d.id.substr(0, 3))
                    for (var f = d.c.match(a.Nb), e = 0; e < f.length; ++e) {
                        var g = f[e],
                            h = g.match(a.Ta),
                            l = '';
                        '%' == h[1] && 'timezone_offset' == h[2]
                            ? (l = new Date().getTimezoneOffset())
                            : '%' == h[1] && 'timestampz' == h[2] && (l = a.xb());
                        d.c = d.c.replace(g, a.escape(l));
                    }
            }
    };
    a.xb = function () {
        var c = new Date(),
            b = new Date(6e4 * Math.abs(c.getTimezoneOffset()));
        return (
            a.k(4, c.getFullYear()) +
            '-' +
            a.k(2, c.getMonth() + 1) +
            '-' +
            a.k(2, c.getDate()) +
            'T' +
            a.k(2, c.getHours()) +
            ':' +
            a.k(2, c.getMinutes()) +
            ':' +
            a.k(2, c.getSeconds()) +
            (0 < c.getTimezoneOffset() ? '-' : '+') +
            a.k(2, b.getUTCHours()) +
            ':' +
            a.k(2, b.getUTCMinutes())
        );
    };
    a.k = function (a, b) {
        return (Array(a + 1).join(0) + b).slice(-a);
    };
    a.ta = {};
    a.doPostbacks = function (c) {
        if ('object' == typeof c)
            if (
                (a.tb(c),
                'object' == typeof a.AudienceManagement &&
                    'function' == typeof a.AudienceManagement.isReady &&
                    a.AudienceManagement.isReady() &&
                    'function' == typeof a.AudienceManagement.passData)
            )
                a.AudienceManagement.passData(c);
            else if ('object' == typeof c && 'object' == typeof c.dests)
                for (var b = 0; b < c.dests.length; ++b) {
                    var d = c.dests[b];
                    'object' == typeof d &&
                        'string' == typeof d.c &&
                        'string' == typeof d.id &&
                        'aa.' == d.id.substr(0, 3) &&
                        ((a.ta[d.id] = new Image()), (a.ta[d.id].alt = ''), (a.ta[d.id].src = d.c));
                }
    };
    a.sb = function (c) {
        a.i || a.Bb();
        a.i.push(c);
        a.ma = a.C();
        a.Ra();
    };
    a.Bb = function () {
        a.i = a.Db();
        a.i || (a.i = []);
    };
    a.Db = function () {
        var c, b;
        if (a.ra()) {
            try {
                (b = h.localStorage.getItem(a.pa())) && (c = h.JSON.parse(b));
            } catch (d) {}
            return c;
        }
    };
    a.ra = function () {
        var c = !0;
        (a.trackOffline && a.offlineFilename && h.localStorage && h.JSON) || (c = !1);
        return c;
    };
    a.Ia = function () {
        var c = 0;
        a.i && (c = a.i.length);
        a.q && c++;
        return c;
    };
    a.ka = function () {
        if (a.q && (a.B && a.B.complete && a.B.F && a.B.va(), a.q)) return;
        a.Ja = n;
        if (a.qa) a.ma > a.N && a.Pa(a.i), a.ua(500);
        else {
            var c = a.nb();
            if (0 < c) a.ua(c);
            else if ((c = a.Fa())) (a.q = 1), a.Eb(c), a.Ib(c);
        }
    };
    a.ua = function (c) {
        a.Ja || (c || (c = 0), (a.Ja = setTimeout(a.ka, c)));
    };
    a.nb = function () {
        var c;
        if (!a.trackOffline || 0 >= a.offlineThrottleDelay) return 0;
        c = a.C() - a.Oa;
        return a.offlineThrottleDelay < c ? 0 : a.offlineThrottleDelay - c;
    };
    a.Fa = function () {
        if (0 < a.i.length) return a.i.shift();
    };
    a.Eb = function (c) {
        if (a.debugTracking) {
            var b = 'AppMeasurement Debug: ' + c;
            c = c.split('&');
            var d;
            for (d = 0; d < c.length; d++) b += '\n\t' + a.unescape(c[d]);
            a.P(b);
        }
    };
    a.fb = function () {
        return a.marketingCloudVisitorID || a.analyticsVisitorID;
    };
    a.Y = !1;
    var q;
    try {
        q = JSON.parse('{"x":"y"}');
    } catch (u) {
        q = null;
    }
    q && 'y' == q.x
        ? ((a.Y = !0),
          (a.X = function (a) {
              return JSON.parse(a);
          }))
        : h.$ && h.$.parseJSON
        ? ((a.X = function (a) {
              return h.$.parseJSON(a);
          }),
          (a.Y = !0))
        : (a.X = function () {
              return null;
          });
    a.Ib = function (c) {
        var b, d, f;
        a.fb() &&
            2047 < c.length &&
            ('undefined' != typeof XMLHttpRequest &&
                ((b = new XMLHttpRequest()), 'withCredentials' in b ? (d = 1) : (b = 0)),
            b || 'undefined' == typeof XDomainRequest || ((b = new XDomainRequest()), (d = 2)),
            b &&
                ((a.AudienceManagement && a.AudienceManagement.isReady()) || 0 != a.usePostbacks) &&
                (a.Y ? (b.Ba = !0) : (b = 0)));
        !b && a.Sa && (c = c.substring(0, 2047));
        !b &&
            a.d.createElement &&
            (0 != a.usePostbacks || (a.AudienceManagement && a.AudienceManagement.isReady())) &&
            (b = a.d.createElement('SCRIPT')) &&
            'async' in b &&
            ((f = (f = a.d.getElementsByTagName('HEAD')) && f[0] ? f[0] : a.d.body)
                ? ((b.type = 'text/javascript'), b.setAttribute('async', 'async'), (d = 3))
                : (b = 0));
        b ||
            ((b = new Image()),
            (b.alt = ''),
            b.abort ||
                'undefined' === typeof h.InstallTrigger ||
                (b.abort = function () {
                    b.src = n;
                }));
        b.Da = function () {
            try {
                b.F && (clearTimeout(b.F), (b.F = 0));
            } catch (a) {}
        };
        b.onload = b.va = function () {
            a.ab(c);
            b.Da();
            a.rb();
            a.ga();
            a.q = 0;
            a.ka();
            if (b.Ba) {
                b.Ba = !1;
                try {
                    a.doPostbacks(a.X(b.responseText));
                } catch (d) {}
            }
        };
        b.onabort = b.onerror = b.Ga = function () {
            b.Da();
            (a.trackOffline || a.qa) && a.q && a.i.unshift(a.qb);
            a.q = 0;
            a.ma > a.N && a.Pa(a.i);
            a.ga();
            a.ua(500);
        };
        b.onreadystatechange = function () {
            4 == b.readyState && (200 == b.status ? b.va() : b.Ga());
        };
        a.Oa = a.C();
        if (1 == d || 2 == d) {
            var e = c.indexOf('?');
            f = c.substring(0, e);
            e = c.substring(e + 1);
            e = e.replace(/&callback=[a-zA-Z0-9_.\[\]]+/, '');
            1 == d ? (b.open('POST', f, !0), b.send(e)) : 2 == d && (b.open('POST', f), b.send(e));
        } else if (((b.src = c), 3 == d)) {
            if (a.Ma)
                try {
                    f.removeChild(a.Ma);
                } catch (g) {}
            f.firstChild ? f.insertBefore(b, f.firstChild) : f.appendChild(b);
            a.Ma = a.B;
        }
        b.F = setTimeout(function () {
            b.F && (b.complete ? b.va() : (a.trackOffline && b.abort && b.abort(), b.Ga()));
        }, 5e3);
        a.qb = c;
        a.B = h['s_i_' + a.replace(a.account, ',', '_')] = b;
        if ((a.useForcedLinkTracking && a.J) || a.A)
            a.forcedLinkTrackingTimeout || (a.forcedLinkTrackingTimeout = 250),
                (a.ha = setTimeout(a.ga, a.forcedLinkTrackingTimeout));
    };
    a.rb = function () {
        if (a.ra() && !(a.Na > a.N))
            try {
                h.localStorage.removeItem(a.pa()), (a.Na = a.C());
            } catch (c) {}
    };
    a.Pa = function (c) {
        if (a.ra()) {
            a.Ra();
            try {
                h.localStorage.setItem(a.pa(), h.JSON.stringify(c)), (a.N = a.C());
            } catch (b) {}
        }
    };
    a.Ra = function () {
        if (a.trackOffline) {
            if (!a.offlineLimit || 0 >= a.offlineLimit) a.offlineLimit = 10;
            for (; a.i.length > a.offlineLimit; ) a.Fa();
        }
    };
    a.forceOffline = function () {
        a.qa = !0;
    };
    a.forceOnline = function () {
        a.qa = !1;
    };
    a.pa = function () {
        return a.offlineFilename + '-' + a.visitorNamespace + a.account;
    };
    a.C = function () {
        return new Date().getTime();
    };
    a.Ka = function (a) {
        a = a.toLowerCase();
        return 0 != a.indexOf('#') &&
            0 != a.indexOf('about:') &&
            0 != a.indexOf('opera:') &&
            0 != a.indexOf('javascript:')
            ? !0
            : !1;
    };
    a.setTagContainer = function (c) {
        var b, d, f;
        a.Jb = c;
        for (b = 0; b < a._il.length; b++)
            if ((d = a._il[b]) && 's_l' == d._c && d.tagContainerName == c) {
                a.R(d);
                if (d.lmq) for (b = 0; b < d.lmq.length; b++) (f = d.lmq[b]), a.loadModule(f.n);
                if (d.ml)
                    for (f in d.ml)
                        if (a[f])
                            for (b in ((c = a[f]), (f = d.ml[f]), f))
                                !Object.prototype[b] &&
                                    ('function' != typeof f[b] ||
                                        0 > ('' + f[b]).indexOf('s_c_il')) &&
                                    (c[b] = f[b]);
                if (d.mmq)
                    for (b = 0; b < d.mmq.length; b++)
                        (f = d.mmq[b]),
                            a[f.m] &&
                                ((c = a[f.m]),
                                c[f.f] &&
                                    'function' == typeof c[f.f] &&
                                    (f.a ? c[f.f].apply(c, f.a) : c[f.f].apply(c)));
                if (d.tq) for (b = 0; b < d.tq.length; b++) a.track(d.tq[b]);
                d.s = a;
                break;
            }
    };
    a.Util = {
        urlEncode: a.escape,
        urlDecode: a.unescape,
        cookieRead: a.cookieRead,
        cookieWrite: a.cookieWrite,
        getQueryParam: function (c, b, d) {
            var f;
            b || (b = a.pageURL ? a.pageURL : h.location);
            d || (d = '&');
            return c &&
                b &&
                ((b = '' + b),
                (f = b.indexOf('?')),
                0 <= f &&
                    ((b = d + b.substring(f + 1) + d),
                    (f = b.indexOf(d + c + '=')),
                    0 <= f &&
                        ((b = b.substring(f + d.length + c.length + 1)),
                        (f = b.indexOf(d)),
                        0 <= f && (b = b.substring(0, f)),
                        0 < b.length)))
                ? a.unescape(b)
                : '';
        },
    };
    a.G = 'supplementalDataID timestamp dynamicVariablePrefix visitorID marketingCloudVisitorID analyticsVisitorID audienceManagerLocationHint authState fid vmk visitorMigrationKey visitorMigrationServer visitorMigrationServerSecure charSet visitorNamespace cookieDomainPeriods fpCookieDomainPeriods cookieLifetime pageName pageURL referrer contextData currencyCode lightProfileID lightStoreForSeconds lightIncrementBy retrieveLightProfiles deleteLightProfiles retrieveLightData'.split(
        ' '
    );
    a.g = a.G.concat(
        'purchaseID variableProvider channel server pageType transactionID campaign state zip events events2 products audienceManagerBlob tnt'.split(
            ' '
        )
    );
    a.na = 'timestamp charSet visitorNamespace cookieDomainPeriods cookieLifetime contextData lightProfileID lightStoreForSeconds lightIncrementBy'.split(
        ' '
    );
    a.O = a.na.slice(0);
    a.Aa = 'account allAccounts debugTracking visitor visitorOptedOut trackOffline offlineLimit offlineThrottleDelay offlineFilename usePlugins doPlugins configURL visitorSampling visitorSamplingGroup linkObject clickObject linkURL linkName linkType trackDownloadLinks trackExternalLinks trackClickMap trackInlineStats linkLeaveQueryString linkTrackVars linkTrackEvents linkDownloadFileTypes linkExternalFilters linkInternalFilters useForcedLinkTracking forcedLinkTrackingTimeout trackingServer trackingServerSecure ssl abort mobile dc lightTrackVars maxDelay expectSupplementalData usePostbacks registerPreTrackCallback registerPostTrackCallback AudienceManagement'.split(
        ' '
    );
    for (l = 0; 250 >= l; l++)
        76 > l && (a.g.push('prop' + l), a.O.push('prop' + l)),
            a.g.push('eVar' + l),
            a.O.push('eVar' + l),
            6 > l && a.g.push('hier' + l),
            4 > l && a.g.push('list' + l);
    l = 'pe pev1 pev2 pev3 latitude longitude resolution colorDepth javascriptVersion javaEnabled cookiesEnabled browserWidth browserHeight connectionType homepage pageURLRest'.split(
        ' '
    );
    a.g = a.g.concat(l);
    a.G = a.G.concat(l);
    a.ssl = 0 <= h.location.protocol.toLowerCase().indexOf('https');
    a.charSet = 'UTF-8';
    a.contextData = {};
    a.offlineThrottleDelay = 0;
    a.offlineFilename = 'AppMeasurement.offline';
    a.Oa = 0;
    a.ma = 0;
    a.N = 0;
    a.Na = 0;
    a.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
    a.w = h;
    a.d = h.document;
    try {
        if (((a.Sa = !1), navigator)) {
            var v = navigator.userAgent;
            if (
                'Microsoft Internet Explorer' == navigator.appName ||
                0 <= v.indexOf('MSIE ') ||
                (0 <= v.indexOf('Trident/') && 0 <= v.indexOf('Windows NT 6'))
            )
                a.Sa = !0;
        }
    } catch (w) {}
    a.ga = function () {
        a.ha && (h.clearTimeout(a.ha), (a.ha = n));
        a.l && a.J && a.l.dispatchEvent(a.J);
        a.A && ('function' == typeof a.A ? a.A() : a.l && a.l.href && (a.d.location = a.l.href));
        a.l = a.J = a.A = 0;
    };
    a.Qa = function () {
        a.b = a.d.body;
        a.b
            ? ((a.v = function (c) {
                  var b, d, f, e, g;
                  if (!((a.d && a.d.getElementById('cppXYctnr')) || (c && c['s_fe_' + a._in]))) {
                      if (a.Ca)
                          if (a.useForcedLinkTracking) a.b.removeEventListener('click', a.v, !1);
                          else {
                              a.b.removeEventListener('click', a.v, !0);
                              a.Ca = a.useForcedLinkTracking = 0;
                              return;
                          }
                      else a.useForcedLinkTracking = 0;
                      a.clickObject = c.srcElement ? c.srcElement : c.target;
                      try {
                          if (
                              !a.clickObject ||
                              (a.M && a.M == a.clickObject) ||
                              !(
                                  a.clickObject.tagName ||
                                  a.clickObject.parentElement ||
                                  a.clickObject.parentNode
                              )
                          )
                              a.clickObject = 0;
                          else {
                              var k = (a.M = a.clickObject);
                              a.la && (clearTimeout(a.la), (a.la = 0));
                              a.la = setTimeout(function () {
                                  a.M == k && (a.M = 0);
                              }, 1e4);
                              f = a.Ia();
                              a.track();
                              if (f < a.Ia() && a.useForcedLinkTracking && c.target) {
                                  for (
                                      e = c.target;
                                      e &&
                                      e != a.b &&
                                      'A' != e.tagName.toUpperCase() &&
                                      'AREA' != e.tagName.toUpperCase();

                                  )
                                      e = e.parentNode;
                                  if (
                                      e &&
                                      ((g = e.href),
                                      a.Ka(g) || (g = 0),
                                      (d = e.target),
                                      c.target.dispatchEvent &&
                                          g &&
                                          (!d ||
                                              '_self' == d ||
                                              '_top' == d ||
                                              '_parent' == d ||
                                              (h.name && d == h.name)))
                                  ) {
                                      try {
                                          b = a.d.createEvent('MouseEvents');
                                      } catch (l) {
                                          b = new h.MouseEvent();
                                      }
                                      if (b) {
                                          try {
                                              b.initMouseEvent(
                                                  'click',
                                                  c.bubbles,
                                                  c.cancelable,
                                                  c.view,
                                                  c.detail,
                                                  c.screenX,
                                                  c.screenY,
                                                  c.clientX,
                                                  c.clientY,
                                                  c.ctrlKey,
                                                  c.altKey,
                                                  c.shiftKey,
                                                  c.metaKey,
                                                  c.button,
                                                  c.relatedTarget
                                              );
                                          } catch (n) {
                                              b = 0;
                                          }
                                          b &&
                                              ((b['s_fe_' + a._in] = b.s_fe = 1),
                                              c.stopPropagation(),
                                              c.stopImmediatePropagation &&
                                                  c.stopImmediatePropagation(),
                                              c.preventDefault(),
                                              (a.l = c.target),
                                              (a.J = b));
                                      }
                                  }
                              }
                          }
                      } catch (p) {
                          a.clickObject = 0;
                      }
                  }
              }),
              a.b && a.b.attachEvent
                  ? a.b.attachEvent('onclick', a.v)
                  : a.b &&
                    a.b.addEventListener &&
                    (navigator &&
                        ((0 <= navigator.userAgent.indexOf('WebKit') && a.d.createEvent) ||
                            (0 <= navigator.userAgent.indexOf('Firefox/2') && h.MouseEvent)) &&
                        ((a.Ca = 1),
                        (a.useForcedLinkTracking = 1),
                        a.b.addEventListener('click', a.v, !0)),
                    a.b.addEventListener('click', a.v, !1)))
            : setTimeout(a.Qa, 30);
    };
    a.Qa();
    a.loadModule('ActivityMap');
}
function s_gi(a) {
    var h,
        n = window.s_c_il,
        p,
        l,
        r = a.split(','),
        s,
        q,
        u = 0;
    if (n)
        for (p = 0; !u && p < n.length; ) {
            h = n[p];
            if ('s_c' == h._c && (h.account || h.oun))
                if (h.account && h.account == a) u = 1;
                else
                    for (
                        l = h.account ? h.account : h.oun,
                            l = h.allAccounts ? h.allAccounts : l.split(','),
                            s = 0;
                        s < r.length;
                        s++
                    )
                        for (q = 0; q < l.length; q++) r[s] == l[q] && (u = 1);
            p++;
        }
    u || (h = new AppMeasurement());
    h.setAccount ? h.setAccount(a) : h.sa && h.sa(a);
    return h;
}
AppMeasurement.getInstance = s_gi;
window.s_objectID || (window.s_objectID = 0);
function s_pgicq() {
    var a = window,
        h = a.s_giq,
        n,
        p,
        l;
    if (h)
        for (n = 0; n < h.length; n++)
            (p = h[n]),
                (l = s_gi(p.oun)),
                l.setAccount(p.un),
                l.setTagContainer(p.tagContainerName);
    a.s_giq = 0;
}
s_pgicq();

/*
Media Module
*/
function AppMeasurement_Module_Media(q) {
    var b = this;
    b.s = q;
    q = window;
    q.s_c_in || ((q.s_c_il = []), (q.s_c_in = 0));
    b._il = q.s_c_il;
    b._in = q.s_c_in;
    b._il[b._in] = b;
    q.s_c_in++;
    b._c = 's_m';
    b.list = [];
    b.open = function (d, c, e, k) {
        var f = {},
            a = new Date(),
            l = '',
            g;
        c || (c = -1);
        if (d && e) {
            b.list || (b.list = {});
            b.list[d] && b.close(d);
            k && k.id && (l = k.id);
            if (l)
                for (g in b.list)
                    !Object.prototype[g] &&
                        b.list[g] &&
                        b.list[g].R == l &&
                        b.close(b.list[g].name);
            f.name = d;
            f.length = c;
            f.offset = 0;
            f.e = 0;
            f.playerName = b.playerName ? b.playerName : e;
            f.R = l;
            f.C = 0;
            f.a = 0;
            f.timestamp = Math.floor(a.getTime() / 1e3);
            f.k = 0;
            f.u = f.timestamp;
            f.c = -1;
            f.n = '';
            f.g = -1;
            f.D = 0;
            f.I = {};
            f.G = 0;
            f.m = 0;
            f.f = '';
            f.B = 0;
            f.L = 0;
            f.A = 0;
            f.F = 0;
            f.l = !1;
            f.v = '';
            f.J = '';
            f.K = 0;
            f.r = !1;
            f.H = '';
            f.complete = 0;
            f.Q = 0;
            f.p = 0;
            f.q = 0;
            b.list[d] = f;
        }
    };
    b.openAd = function (d, c, e, k, f, a, l, g) {
        var h = {};
        b.open(d, c, e, g);
        if ((h = b.list[d])) (h.l = !0), (h.v = k), (h.J = f), (h.K = a), (h.H = l);
    };
    b.M = function (d) {
        var c = b.list[d];
        b.list[d] = 0;
        c && c.monitor && clearTimeout(c.monitor.interval);
    };
    b.close = function (d) {
        b.i(d, 0, -1);
    };
    b.play = function (d, c, e, k) {
        var f = b.i(d, 1, c, e, k);
        f &&
            !f.monitor &&
            ((f.monitor = {}),
            (f.monitor.update = function () {
                1 == f.k && b.i(f.name, 3, -1);
                f.monitor.interval = setTimeout(f.monitor.update, 1e3);
            }),
            f.monitor.update());
    };
    b.click = function (d, c) {
        b.i(d, 7, c);
    };
    b.complete = function (d, c) {
        b.i(d, 5, c);
    };
    b.stop = function (d, c) {
        b.i(d, 2, c);
    };
    b.track = function (d) {
        b.i(d, 4, -1);
    };
    b.P = function (d, c) {
        var e = 'a.media.',
            k = d.linkTrackVars,
            f = d.linkTrackEvents,
            a = 'm_i',
            l,
            g = d.contextData,
            h;
        c.l &&
            ((e += 'ad.'),
            c.v && ((g['a.media.name'] = c.v), (g[e + 'pod'] = c.J), (g[e + 'podPosition'] = c.K)),
            c.G || (g[e + 'CPM'] = c.H));
        c.r && ((g[e + 'clicked'] = !0), (c.r = !1));
        g['a.contentType'] = 'video' + (c.l ? 'Ad' : '');
        g['a.media.channel'] = b.channel;
        g[e + 'name'] = c.name;
        g[e + 'playerName'] = c.playerName;
        0 < c.length && (g[e + 'length'] = c.length);
        g[e + 'timePlayed'] = Math.floor(c.a);
        0 < Math.floor(c.a) && (g[e + 'timePlayed'] = Math.floor(c.a));
        c.G ||
            ((g[e + 'view'] = !0),
            (a = 'm_s'),
            b.Heartbeat &&
                b.Heartbeat.enabled &&
                (a = c.l ? (b.__primetime ? 'mspa_s' : 'msa_s') : b.__primetime ? 'msp_s' : 'ms_s'),
            (c.G = 1));
        c.f &&
            ((g[e + 'segmentNum'] = c.m),
            (g[e + 'segment'] = c.f),
            0 < c.B && (g[e + 'segmentLength'] = c.B),
            c.A && 0 < c.a && (g[e + 'segmentView'] = !0));
        !c.Q && c.complete && ((g[e + 'complete'] = !0), (c.S = 1));
        0 < c.p && (g[e + 'milestone'] = c.p);
        0 < c.q && (g[e + 'offsetMilestone'] = c.q);
        if (k) for (h in g) Object.prototype[h] || (k += ',contextData.' + h);
        l = g['a.contentType'];
        d.pe = a;
        d.pev3 = l;
        var q, s;
        if (b.contextDataMapping)
            for (h in (d.events2 || (d.events2 = ''), k && (k += ',events'), b.contextDataMapping))
                if (!Object.prototype[h]) {
                    a =
                        h.length > e.length && h.substring(0, e.length) == e
                            ? h.substring(e.length)
                            : '';
                    l = b.contextDataMapping[h];
                    if ('string' == typeof l)
                        for (q = l.split(','), s = 0; s < q.length; s++)
                            (l = q[s]),
                                'a.contentType' == h
                                    ? (k && (k += ',' + l), (d[l] = g[h]))
                                    : 'view' == a ||
                                      'segmentView' == a ||
                                      'clicked' == a ||
                                      'complete' == a ||
                                      'timePlayed' == a ||
                                      'CPM' == a
                                    ? (f && (f += ',' + l),
                                      'timePlayed' == a || 'CPM' == a
                                          ? g[h] &&
                                            (d.events2 += (d.events2 ? ',' : '') + l + '=' + g[h])
                                          : g[h] && (d.events2 += (d.events2 ? ',' : '') + l))
                                    : 'segment' == a && g[h + 'Num']
                                    ? (k && (k += ',' + l), (d[l] = g[h + 'Num'] + ':' + g[h]))
                                    : (k && (k += ',' + l), (d[l] = g[h]));
                    else if ('milestones' == a || 'offsetMilestones' == a)
                        (h = h.substring(0, h.length - 1)),
                            g[h] &&
                                b.contextDataMapping[h + 's'][g[h]] &&
                                (f && (f += ',' + b.contextDataMapping[h + 's'][g[h]]),
                                (d.events2 +=
                                    (d.events2 ? ',' : '') + b.contextDataMapping[h + 's'][g[h]]));
                    g[h] && (g[h] = 0);
                    'segment' == a && g[h + 'Num'] && (g[h + 'Num'] = 0);
                }
        d.linkTrackVars = k;
        d.linkTrackEvents = f;
    };
    b.i = function (d, c, e, k, f) {
        var a = {},
            l = new Date().getTime() / 1e3,
            g,
            h,
            q = b.trackVars,
            s = b.trackEvents,
            t = b.trackSeconds,
            u = b.trackMilestones,
            v = b.trackOffsetMilestones,
            w = b.segmentByMilestones,
            x = b.segmentByOffsetMilestones,
            p,
            n,
            r = 1,
            m = {},
            y;
        b.channel || (b.channel = b.s.w.location.hostname);
        if ((a = d && b.list && b.list[d] ? b.list[d] : 0))
            if (
                (a.l &&
                    ((t = b.adTrackSeconds),
                    (u = b.adTrackMilestones),
                    (v = b.adTrackOffsetMilestones),
                    (w = b.adSegmentByMilestones),
                    (x = b.adSegmentByOffsetMilestones)),
                0 > e && (e = 1 == a.k && 0 < a.u ? l - a.u + a.c : a.c),
                0 < a.length && (e = e < a.length ? e : a.length),
                0 > e && (e = 0),
                (a.offset = e),
                0 < a.length &&
                    ((a.e = (a.offset / a.length) * 100), (a.e = 100 < a.e ? 100 : a.e)),
                0 > a.c && (a.c = e),
                (y = a.D),
                (m.name = d),
                (m.ad = a.l),
                (m.length = a.length),
                (m.openTime = new Date()),
                m.openTime.setTime(1e3 * a.timestamp),
                (m.offset = a.offset),
                (m.percent = a.e),
                (m.playerName = a.playerName),
                (m.mediaEvent =
                    0 > a.g
                        ? 'OPEN'
                        : 1 == c
                        ? 'PLAY'
                        : 2 == c
                        ? 'STOP'
                        : 3 == c
                        ? 'MONITOR'
                        : 4 == c
                        ? 'TRACK'
                        : 5 == c
                        ? 'COMPLETE'
                        : 7 == c
                        ? 'CLICK'
                        : 'CLOSE'),
                2 < c || (c != a.k && (2 != c || 1 == a.k)))
            ) {
                f || ((k = a.m), (f = a.f));
                if (c) {
                    1 == c && (a.c = e);
                    if ((3 >= c || 5 <= c) && 0 <= a.g && ((r = !1), (q = s = 'None'), a.g != e)) {
                        h = a.g;
                        h > e && ((h = a.c), h > e && (h = e));
                        p = u ? u.split(',') : 0;
                        if (0 < a.length && p && e >= h)
                            for (n = 0; n < p.length; n++)
                                (g = p[n] ? parseFloat('' + p[n]) : 0) &&
                                    (h / a.length) * 100 < g &&
                                    a.e >= g &&
                                    ((r = !0),
                                    (n = p.length),
                                    (m.mediaEvent = 'MILESTONE'),
                                    (a.p = m.milestone = g));
                        if ((p = v ? v.split(',') : 0) && e >= h)
                            for (n = 0; n < p.length; n++)
                                (g = p[n] ? parseFloat('' + p[n]) : 0) &&
                                    h < g &&
                                    e >= g &&
                                    ((r = !0),
                                    (n = p.length),
                                    (m.mediaEvent = 'OFFSET_MILESTONE'),
                                    (a.q = m.offsetMilestone = g));
                    }
                    if (a.L || !f) {
                        if (w && u && 0 < a.length) {
                            if ((p = u.split(',')))
                                for (p.push('100'), n = h = 0; n < p.length; n++)
                                    if ((g = p[n] ? parseFloat('' + p[n]) : 0))
                                        a.e < g &&
                                            ((k = n + 1), (f = 'M:' + h + '-' + g), (n = p.length)),
                                            (h = g);
                        } else if (x && v && (p = v.split(',')))
                            for (
                                p.push('' + (0 < a.length ? a.length : 'E')), n = h = 0;
                                n < p.length;
                                n++
                            )
                                if ((g = p[n] ? parseFloat('' + p[n]) : 0) || 'E' == p[n]) {
                                    if (e < g || 'E' == p[n])
                                        (k = n + 1), (f = 'O:' + h + '-' + g), (n = p.length);
                                    h = g;
                                }
                        f && (a.L = !0);
                    }
                    (f || a.f) &&
                        f != a.f &&
                        ((a.F = !0), a.f || ((a.m = k), (a.f = f)), 0 <= a.g && (r = !0));
                    (2 <= c || 100 <= a.e) && a.c < e && ((a.C += e - a.c), (a.a += e - a.c));
                    if (2 >= c || (3 == c && !a.k))
                        (a.n += (1 == c || 3 == c ? 'S' : 'E') + Math.floor(e)),
                            (a.k = 3 == c ? 1 : c);
                    !r &&
                        0 <= a.g &&
                        3 >= c &&
                        (t = t ? t : 0) &&
                        a.a >= t &&
                        ((r = !0), (m.mediaEvent = 'SECONDS'));
                    a.u = l;
                    a.c = e;
                }
                if (!c || (3 >= c && 100 <= a.e))
                    2 != a.k && (a.n += 'E' + Math.floor(e)),
                        (c = 0),
                        (q = s = 'None'),
                        (m.mediaEvent = 'CLOSE');
                7 == c && (r = m.clicked = a.r = !0);
                if (
                    5 == c ||
                    (b.completeByCloseOffset &&
                        (!c || 100 <= a.e) &&
                        0 < a.length &&
                        e >= a.length - b.completeCloseOffsetThreshold)
                )
                    r = m.complete = a.complete = !0;
                l = m.mediaEvent;
                'MILESTONE' == l
                    ? (l += '_' + m.milestone)
                    : 'OFFSET_MILESTONE' == l && (l += '_' + m.offsetMilestone);
                a.I[l] ? (m.eventFirstTime = !1) : ((m.eventFirstTime = !0), (a.I[l] = 1));
                m.event = m.mediaEvent;
                m.timePlayed = a.C;
                m.segmentNum = a.m;
                m.segment = a.f;
                m.segmentLength = a.B;
                b.monitor && 4 != c && b.monitor(b.s, m);
                b.Heartbeat && b.Heartbeat.enabled && 0 <= a.g && (r = !1);
                0 == c && b.M(d);
                r &&
                    a.D == y &&
                    ((d = { contextData: {} }),
                    (d.linkTrackVars = q),
                    (d.linkTrackEvents = s),
                    d.linkTrackVars || (d.linkTrackVars = ''),
                    d.linkTrackEvents || (d.linkTrackEvents = ''),
                    b.P(d, a),
                    d.linkTrackVars || (d['!linkTrackVars'] = 1),
                    d.linkTrackEvents || (d['!linkTrackEvents'] = 1),
                    b.s.track(d),
                    a.F ? ((a.m = k), (a.f = f), (a.A = !0), (a.F = !1)) : 0 < a.a && (a.A = !1),
                    (a.n = ''),
                    (a.p = a.q = 0),
                    (a.a -= Math.floor(a.a)),
                    (a.g = e),
                    a.D++);
            }
        return a;
    };
    b.O = function (d, c, e, k, f) {
        var a = 0;
        if (d && (!b.autoTrackMediaLengthRequired || (c && 0 < c))) {
            if (b.list && b.list[d]) a = 1;
            else if (1 == e || 3 == e) b.open(d, c, 'HTML5 Video', f), (a = 1);
            a && b.i(d, e, k, -1, 0);
        }
    };
    b.attach = function (d) {
        var c, e, k;
        d &&
            d.tagName &&
            'VIDEO' == d.tagName.toUpperCase() &&
            (b.o ||
                (b.o = function (c, a, d) {
                    var e, h;
                    b.autoTrack &&
                        ((e = c.currentSrc),
                        (h = c.duration) || (h = -1),
                        0 > d && (d = c.currentTime),
                        b.O(e, h, a, d, c));
                }),
            (c = function () {
                b.o(d, 1, -1);
            }),
            (e = function () {
                b.o(d, 1, -1);
            }),
            b.j(d, 'play', c),
            b.j(d, 'pause', e),
            b.j(d, 'seeking', e),
            b.j(d, 'seeked', c),
            b.j(d, 'ended', function () {
                b.o(d, 0, -1);
            }),
            b.j(d, 'timeupdate', c),
            (k = function () {
                d.paused || d.ended || d.seeking || b.o(d, 3, -1);
                setTimeout(k, 1e3);
            }),
            k());
    };
    b.j = function (b, c, e) {
        b.attachEvent
            ? b.attachEvent('on' + c, e)
            : b.addEventListener && b.addEventListener(c, e, !1);
    };
    void 0 == b.completeByCloseOffset && (b.completeByCloseOffset = 1);
    void 0 == b.completeCloseOffsetThreshold && (b.completeCloseOffsetThreshold = 1);
    b.Heartbeat = {};
    b.N = function () {
        var d, c;
        if (b.autoTrack && (d = b.s.d.getElementsByTagName('VIDEO')))
            for (c = 0; c < d.length; c++) b.attach(d[c]);
    };
    b.j(q, 'load', b.N);
}
