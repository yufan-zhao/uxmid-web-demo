module.exports =
{
    title: "Wayto前端开发指南",
    description: "Just playing around",
    // theme: "@vuepress/vue",
    themeConfig:
    {
        nav:
        [
            { text: "指南", link: "/guide/"},
            { text: "目录", link: "/category/apis"}
        ],
        sidebar:
        {
            "/guide/": getGuideSidebar("指南", "深入"),
            "/category/": getCategorySidebar("src")
        }
    },
    plugins:
    [
        [
            'container',
            {
                type: 'vue',
                before: '<pre class="vue-container"><code>',
                after: '</code></pre>'
            }
        ],
    ]
};

function getGuideSidebar(groupA, groupB)
{
    return [
        {
            title: groupA,
            collapsable: false,
            children:
            [
                "",
                "env",
                "standard",
                "directory-structure",
                "switch-table"
            ]
        }
    ];
}

function getCategorySidebar(groupA)
{
    return [
        {
            title: groupA,
            collapsable: false,
            children:
            [
                "apis",
                "application",
                "assets",
                "broadcasts",
                "common",
                "components",
                "enums",
                "models",
                "repository",
                "routes",
                "services",
                "styles",
                "types",
                "views"
            ]
        }
    ];
}
