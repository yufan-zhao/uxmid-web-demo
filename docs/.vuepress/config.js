module.exports =
{
    title: "前端开发指南",
    description: "Just playing around",
    themeConfig:
    {
        nav:
        [
            { text: "指南", link: "/guide/"}
        ],
        sidebar: "auto",
        sidebar:
        [
            {
                title: "指南",
                collapsable: false,
                children: ["/guide/"]
            }
        ]
    }
};
