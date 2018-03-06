var menupages = {
    "menupages": {
        "componentname": "menupages",
        "category": "page",
        "icon": "icon-icon-row",
        "row": false,
        "hidden": true,
        "collection": false,
        "defaultdata": '',
        "type": "hidden",
        "afterdrop": function ($appendLayer) { },
        "loadSetting": function ($item) { },
        "settingDOMs": {
            "tabs": {
                "Pages": {
                    "DOM": EasyLibrary.ReadDOM("sitemenu"),
                    "onload": function ($item) {
                        var $parent = $item.parent().parent();
                        var $ebmenu = $parent.find('.eb-menu');
                        ReadMenu();
                        if ($parent.hasClass('menuHeader')) {
                            $('#pagemenutype').hide();
                        } else {
                            $('#pagemenutype').show();
                        }

                        function ReadMenu() {
                            var $menu = $ebmenu.find('> li');
                            $('#headerMenuList').html(BindMenuItem($menu));
                            SortableMenu();
                            SortEvents();
                            var menuType = $ebmenu.attr('data-menu');
                            $('#selMenutype').val(menuType);
                            $('#selMenutype').on('change', function () {
                                $ebmenu.removeClass('horizontal').removeClass('side').removeClass('footer');
                                $ebmenu.attr('data-menu', $(this).val()).addClass($(this).val());
                            });
                        }

                        function BindMenuItem($menu) {
                            var html = '';
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find(' > a > .pageName').text();
                                html += '<div data-type="page" data-pageid="' + pageID + '" class="panel panel-info form-elements element">';
                                html += '<span class="panel-heading"><i class="fa fa-arrows" aria-hidden="true"></i></span>';
                                html += '<span class="title">';
                                html += pageName;
                                html += '</span>';
                                html += '<span class="showinmenu">';
                                var checked = "checked='checked'";
                                if ($item.hasClass('hide-element'))
                                    checked = "";
                                html += '<input id="page_' + pageID + '" class="showpageinmenu" type="checkbox" ' + checked + '>';
                                html += '<label for="page_' + pageID + '"><i class="icon-icon-tick"></i></label>';
                                html += '</span>';
                                //var currentPage = false;
                                //var activeCurrent = '';
                                //if (pageName === portalDefaultPage) {
                                //    currentPage = true;
                                //    activeCurrent = "active";
                                //}
                                // html += '<span class="fa fa-check-circle-o activedefalutPage ' + activeCurrent + '" title="set as starup page" data-pageName="' + pageName + '"></span>';
                                html += '<span class="previewhere fa fa-eye" title="preview page"></span>';
                                html += '<span class="gotoeditor fa fa-outdent" title="go to editor"></span>';
                                // if (!currentPage)
                                // html += '<span class="deleteWebPage fa icon-delete" title="delete page"></span>';
                                //html += '<span class="editWebPage fa fa-pencil-square-o" title="edit page"></span>';
                                if ($item.find('> ul > li').length > 0) {
                                    html += '<div class="sortable panel-body ">';
                                    //html += pageName;
                                    html += BindMenuItem($item.find('> ul > li'), item.MenuItemID);
                                    html += "</div>";
                                } else {
                                    html += '<div class="sortable panel-body">&nbsp;</div>';
                                }
                                html += "</div>";
                            });
                            return html;
                        }

                        function SortableMenu() {
                            var $panelList = $('.sortable');
                            $panelList.sortable({
                                start: function (event, ui) { },
                                handle: '.panel-heading',
                                connectWith: '.sortable',
                                placeholder: 'ui-state-hover',
                                receive: function (event, ui) { },
                                beforeStop: function (ev, ui) { },
                                stop: function (event, ui) {
                                    RebindMenu();
                                    //ReArrange($panelList, $(ui.item[0]));
                                }
                            });
                        }
                        function ReArrange($panelList, $item) {
                            var $index = $item.index($panelList);
                            console.log($index);
                            var $pageid = $item.attr("data-pageid");
                            $ebmenu.find('div[data-pageid="' + pageid + '"]');
                            var $destinationMenu = $ebmenu.find();
                        }
                        function MoveMenuItems() {

                        }
                        function RebindMenu() {
                            var $menu = $('#headerMenuList > div.panel-info');
                            var menuSpan = $ebmenu.find('> li a span').eq(0).attrs();
                            $ebmenu.html(ReBindMenuItem($menu));
                            if ($('#headerMenuList > div.panel-info').length == 1) {
                                $('#headerMenuList > div.panel-info > .deleteWebPage').remove(0);
                            }
                            $ebmenu.find('span').each(function () {
                                $(this).attrs(menuSpan);
                            });
                            PagelinkStop();
                            ActiveMenu();
                            MenuHover($('#primaryColor').css('background-color'), $('#secondaryColor').css('background-color'));
                        }
                        function SortEvents() {
                            $('.showpageinmenu').off().on('click', function () {
                                if ($('#headerMenuList > .panel > .showinmenu >  .showpageinmenu:checked').length > 0) {
                                    var $this = $(this);
                                    var index = $(".showpageinmenu").index($this);
                                    if ($this.is(':checked')) {
                                        $ebmenu.find('li').eq(index).removeClass('hide-element');
                                    } else {
                                        $ebmenu.find('li').eq(index).addClass('hide-element');
                                    }
                                } else {
                                    SageAlertDialog('At least a page must be visible in menu');
                                    $(this).prop('checked', true);
                                }
                            });
                            $('.previewhere').on('click', function () {
                                var name = $(this).parent().find('.title').text();
                                window.open(SageFrameHostURL + '/' + name.replace(" ", '-'), '_blank');
                            });
                            $('.gotoeditor').on('click', function () {
                                var name = $(this).parent().find('.title').text();
                                window.location = SageFrameHostURL + '/WebBuilder/' + name.replace(" ", '-');
                            });
                        }

                        function ReBindMenuItem($menu) {
                            debugger;
                            var html = '';
                            var color = 'rgb(0,0,0)';
                            var fontSize = '';
                            if ($menu.find('li a').not('.active-page').length == 0) {
                                color = 'rgb(0,0,0)';
                                fontSize = '12';
                            } else {
                                var $item = $menu.find('li a').not('active-page').eq(0);
                                color = $item.find('span').css('color');
                                fontSize = $item.find('span').css('font-size');
                            }
                            $.each($menu, function (index, item) {
                                var $item = $(this);
                                var pageID = $item.attr('data-pageid');
                                var pageName = $item.find('> .title').text();
                                var addliclass = 'hide-element';
                                if ($item.find('> .showinmenu').find('.showpageinmenu').is(':checked')) {
                                    addliclass = '';
                                }
                                html += '<li data-pageid="' + pageID + '" class="' + addliclass + '" >';
                                html += '<a href="' + SageFrameHostURL + '/' + pageName.replace(/ /g, '-') + webBuilderPageExtension + '" class="pagelink"><span class="pageName editor-text-letterSpacing-0" style="font-size: ' + fontSize + 'px; color: ' + color + ';">' + pageName + '</span></a>';
                                if ($item.find(' > div.panel-body > div.panel-info').length > 0) {
                                    html += '<ul>';
                                    html += ReBindMenuItem($item.find(' > div.panel-body > div.panel-info'));
                                    html += "</ul>";
                                }
                                html += "</li>";
                            });
                            return html;
                        }
                    }
                },
            },
            "selectLayer": function ($elem) {
                $(".editor-row").removeClass("activeSetting");
                var $parent = $elem.parents(".editor-row");
                $parent.addClass("activeSetting");
                return $parent;
            },
        }
    }
}
