<%@ Control Language="C#" AutoEventWireup="true" CodeFile="SampleTemplate.ascx.cs" Inherits="Modules_Admin_MessageManagement_SampleTemplate_SampleTemplate" %>
<div id="MailSample1">

    <table cellspacing="0" cellpadding="0" align="center" style="color: #262626; overflow: hidden; max-width: 700px; width: 100%; border: 1px solid #ccc; border-radius: 5px; font-family: arial, sans-serif; margin: 0 auto 20px">
        <tr>
            <td style="background-color: #141E23; text-align: center; padding: 15px 0; border-top: 10px solid #3caaff" colspan="2">
                <table cellspacing="0" cellpadding="0" align="center" style="width: 100%">
                    <tr>
                        <td style="text-align: center; background: #141E23">
                            <img style="max-width: 200px;" src='<%=HostUrl%>/images/sageframe.png'></td>
                    </tr>
                    <tr>
                        <td style="text-align: center; color: #bbb; padding: 25px 0; text-transform: none; font-size: 16px; font-weight: bold">Hi ##Username##,</td>
                    </tr>
                    <tr>
                        <td style="text-align: center; color: #bbb; padding: 15px 0; font-size: 25px; font-weight: bold; text-transform: none">This is an email template</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding: 25px 15px; color: #262626; background: #fffline-height:1.5em; text-align: center; background: #fff">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 15px; border-bottom: 1px solid #ccc; background: #fff">
                <span style=""><a href="http://www.contender.com" style="background: #3caaff; font-size: 12px; padding: 5px 10px; color: #fff; color: #fff; text-decoration: none; border: 1px solid #3198d2; border-radius: 5px; -webkit-box-shadow: inset 0 1px 0px rgba(255,255,255,0.32); -moz-box-shadow: inset 0 1px 0px rgba(255,255,255,0.32); box-shadow: inset 0 1px 0px rgba(255,255,255,0.32); text-transform: none">Read more</a></span>
            </td>
        </tr>
        <tr>
            <td style="text-align: center; padding: 15px; background: #fff">
                <p style="margin: 0; font-size: 12px; color: #767676; padding: 5px 0">Best Regards</p>
                <p style="margin: 0; font-size: 13px; padding: 5px 0">Contender</p>
                <p style="margin: 0; font-size: 13px;"><a href="http://www.contender.com" style="color: #262626; padding: 5px 0; text-decoration: none">www.contender.com</a></p>
            </td>

            <tr>
                <td style="color: #9fa2a8; font-size: 12px; padding: 15px; text-align: center; border-top: 1px solid #ccc; background: #fff">
                    <table style="width: 100%">
                        <tr>
                            <td style="text-align: center; padding: 5px 0px; background: #fff; text-transform: none">© 2017 Contender , Ratopool, Kathmandu, Nepal.</td>
                        </tr>
                        <tr>
                            <td style="text-align: center; padding: 5px 0px; background: #fff">Contender is a registered business name of Braindigit Company.</td>
                        </tr>
                    </table>
                </td>
            </tr>
    </table>
</div>
<div id="MailSample2">
    <table cellspacing="0" cellpadding="0" align="center" style="overflow: hidden; max-width: 700px; width: 100%; border: 1px solid #ccc; border-radius: 5px; font-family: Arial, Helvetica, sans-serif; font-weight: normal; margin: 0 auto 20px">

        <tr>
            <td style="text-align: center; padding: 25px 0 15px 0; border-top: 10px solid #3caaff">
                <img src='<%=HostUrl%>/images/sageframe.png'></td>

        </tr>
        <tr>
            <td colspan="2" style="padding: 0; text-align: center;"><span style="max-height: 350px; display: block; overflow: hidden">
                <img src='<%=HostUrl%>/Modules/Admin/MessageManagement/SampleTemplate/img/banner.jpg' style="max-width: 700px; height: auto"></span></td>
        </tr>
        <tr>
            <td colspan="2" style="padding: 0">
                <table border="0" cellspacing="0" cellpadding="0" style="width: 100%; font-weight: normal">
                    <tr>
                        <td style="padding: 15px"><span style="font-size: 16px; color: #262626; text-transform: none">Dear ##UserFirstName## ##UserLastName##</span>,</td>
                    </tr>
                    <tr>
                        <td style="font-size: 16px; background: #fff; font-weight: bold; padding: 15px 15px 25px 15px">Subject: We've had a little makeover !</td>
                    </tr>
                    <tr>
                        <td style="background-color: #3caaff; padding: 15px">
                            <table style="font-weight: normal">
                                <tbody style="background-color: #3caaff">
                                    <tr style="background-color: #3caaff">
                                        <td style="color: #fff; line-height: 1.5em; font-size: 15px; padding-bottom: 15px; text-transform: none">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</td>
                                    </tr>
                                    <tr>
                                        <td style="background: #3caaff; padding: 15px 0; text-align: center; cursor: pointer"><span style="color: #fff; padding: 10px; border: 2px solid #fff">Read more</span>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>


                    <tr>
                        <td style="padding: 0">
                            <table border="0" cellspacing="0" cellpadding="0" style="width: 100%; font-weight: normal">
                                <tr>
                                    <td style="padding: 15px; color: #262626; text-transform: none" colspan="2">
                                        <p style="font-size: 14px; color: #767676; padding: 5px 0; margin: 0">Best Regards</p>
                                        <p style="padding: 2px 0; font-size: 14px; margin: 0;">Contender</p>
                                        <p style="padding: 2px 0; font-size: 14px; margin: 0"><a href="http://www.contender.com" style="color: #262626; text-decoration: none">www.contender.com</a></p>

                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; background: #262626; color: #fff; padding: 10px">
                                        <table border="0" cellspacing="0" cellpadding="0" style="width: 100%; font-weight: normal">
                                            <tr>
                                                <td style="font-size: 13px; background: #262626; text-transform: none; font-weight: bold; padding: 5px; color: #737373">© 2017 Contender , Ratopool, Kathmandu, Nepal.</td>
                                            </tr>
                                            <tr>
                                                <td style="font-size: 12px; color: #737373; padding: 5px; background: #262626">Contender is a registered business name of Braindigit Company. 
                                                </td>
                                            </tr>
                                        </table>
                                    </td>

                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
<div id="MailSample3">


    <table cellspacing="0" cellpadding="0" align="center" style="overflow: hidden; max-width: 700px; width: 100%; border: 1px solid #ccc; font-family: Arial, Helvetica, sans-serif; margin: 0 auto 20px;">
        <tbody>
            <tr>
                <td style="background: url(http://cleverativity.com/wp-content/uploads/2016/01/how-to-close-business-deals-with-cleverativity-business-tips.jpg) no-repeat center center; text-align: center; background-size: 700px auto; padding: 25px; border-bottom: 1px solid #ccc; height: 200px; vertical-align: top" colspan="2">
                    <table style="border: none; width: 100%;">
                        <tr style="background: none">
                            <td style="text-align: left; background: none">
                                <a href="http://www.contentder.com">
                                    <img alt="logo" src='<%=HostUrl%>/images/sageframe.png' style="border: none; max-width: 200px; height: auto" /></a>
                            </td>

                        </tr>


                    </table>
                </td>
            </tr>
            <tr>
                <td style="padding: 0">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; background= #f5f5f5; width: 100%">
                        <tbody>
                            <tr>
                                <td style="padding: 0">
                                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; background=#f5f5f5" style="width=100%;">
                                        <tbody>


                                            <tr>
                                                <td style="text-align: center; padding: 0">
                                                    <p style="font-size: 16px; padding: 15px; font-weight: bold; text-align: center; margin: 0; color: #3caaff; text-transform: none">Dear ##Username##</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="text-align: center; padding: 0; background: #fff">
                                                    <p style="padding: 15px; font-size: 26px; text-align: center; text-decoration: underline; margin: 0">
                                                        We're Hiring</td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" valign="top" style="padding: 0; background: #fff">
                                                    <p style="padding: 15px; line-height: 1.5em; margin: 0; text-transform: none">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. </p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" valign="top" style="padding: 0; background: #fff">
                                                    <p style="padding: 15px; line-height: 1.5em; margin: 0; text-transform: none">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.  fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium.</p>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td colspan="2" height="15" style="padding: 0 15px; text-transform: none; background: #fff">
                                                    <span style="display: block; margin: 20px 0;"><a href="http://www.sageframe.com" target="_blank" style="background: #57c98d; border-radius: 5px; padding: 8px; color: #fff; text-decoration: none; font-size: 13px">click here</a></a></td>
                                            </tr>

                                            <tr>
                                                <td colspan="2" style="background: #fff">
                                                    <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                                                        <tbody>
                                                            <tr>
                                                                <td style="padding: 15px 0; text-transform: none; background: #fff">
                                                                    <span style="display: block; padding: 15px 0 0 0; text-transform: none">Best Regards,<br />
                                                                        <strong style="color: #282929; text-transform: none">SageFrame Team</strong><br />
                                                                        <a href="http://www.sageframe.com" style="text-decoration: none; text-transform: none; color: #226ab7; font-style: italic;" target="_blank" title="SageFrame">http://www.sageframe.com</a></td>
                                                                </span>
                                                            </tr>

                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="background: #141E23; padding: 10px; text-align: center"><span style="text-transform: none; display: block; text-align: center; padding-bottom: 5px; color: #9fa2a8; display: block;">© 2017 Contender , Ratopool, Kathmandu, Nepal.</span><span style="text-transform: none; display: block; color: #9fa2a8;">Contender is a registered business name of Braindigit Company.</span></td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            </tr>
        </tbody>
    </table>


</div>
<div id="MailSample4">

    <table align="center" border="0" cellpadding="0" cellspacing="0" style="color: #262626; font: 12px Arial, Helvetica, sans-serif; border: 1px solid #ccc; border-radius: 5px; max-width: 700px; width: 100%; overflow: hidden; margin: 0 auto">
        <tbody>
            <tr>
                <td style="padding: 25px 0 25px 0; text-align: center; background: #fff;">
                    <table style="border: none; width: 100%">
                        <tr>
                            <td style="text-align: center">
                                <a href="http://www.contentder.com">
                                    <img alt="logo" src='<%=HostUrl%>/images/sageframe.png' style="border: none; max-width: 200px; height: auto" /></a>
                            </td>
                        </tr>


                    </table>
                </td>
                <tr>
                    <td style="padding: 0">
                        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; background= #f5f5f5; width: 100%">
                            <tbody>
                                <tr>
                                    <td style="padding: 0">
                                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0px auto; background=#f5f5f5" style="width=100%;">
                                            <tbody>



                                                <tr>
                                                    <td style="background: url(https://c2.staticflickr.com/2/1588/23982099630_620b71db6e_b.jpg) no-repeat  center center; text-align: center; padding: 25px; background-size: 700px auto; height: 280px;" colspan="2">
                                                        <h1 style="color: #fff">Explore the magic</h1>
                                                        </a>

										<p><a href="http://www.contentder.com" style="background: #5b53ef; padding: 10px 15px; color: #fff; border-radius: 3px; text-decoration: none; cursor: pointer;">Details</a></span></p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" valign="top" style="background: #fff">
                                                        <h2 style="text-align: center; padding: 25px 0; margin: 0; font-size: 25px; text-transform: uppercase;">Great prices on the great outdoors</h2>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td style="padding: 0 15px; background: #fff">
                                                        <table style="width: 100%">
                                                            <tr>
                                                                <td style="padding: 0">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="padding: 0; text-transform: none">
                                                                                    <p style="font-weight: bold; color: #5b53ef; padding: 10px 0; font-size: 13px; margin: 0">Scuba Diving for Two</p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 0 0 15px 0; text-transform: none; background: #fff">If you’re called to explore the deep blue sea but have never been under before, this is the perfect way to get started. Beginners welcome!</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 10px 0; text-transform: none; background: #fff"><span style="display: block; margin-bottom: 15px"><a href="http://www.contentder.com" style="background: #5b53ef; padding: 10px 15px; color: #fff; border-radius: 3px; text-decoration: none; cursor: pointer;">Details</a></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                    <td style="padding: 0 15px; background: #fff">
                                                        <table style="width: 100%">
                                                            <tr>
                                                                <td style="padding: 0">
                                                                    <table>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td style="padding: 0; text-transform: none">
                                                                                    <p style="font-weight: bold; color: #5b53ef; padding: 10px 0; font-size: 13px; margin: 0">Scuba Diving for Two</p>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 0 0 15px 0; text-transform: none; background: #fff">If you’re called to explore the deep blue sea but have never been under before, this is the perfect way to get started. Beginners welcome!</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td style="padding: 10px 0; background: #fff"><span style="display: block; margin-bottom: 15px"><a href="http://www.contentder.com" style="background: #5b53ef; padding: 10px 15px; color: #fff; border-radius: 3px; text-decoration: none; cursor: pointer;">Details</a></span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="padding: 0">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="background: #5b53ef; padding: 0">
                                                        <h3 style="padding: 45px 15px 15px; margin: 0; display: block; text-align: center; color: #fff; font-size: 45px">20% OFF </h3>
                                                        <p style="font-size: 15px; font-weight: normal; color: #fff; text-align: center; padding: 0 0 45px 0">On every purchase</p>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colspan="2" style="padding: 0">
                                                        <table border="0" cellpadding="0" cellspacing="0" style="width: 100%">
                                                            <tbody>
                                                                <tr>
                                                                    <td style="padding: 15px;">
                                                                        <table style="width: 100%">
                                                                            <tr>
                                                                                <td style="padding: 0">
                                                                                    <table>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="padding: 0">
                                                                                                    <p style="font-weight: bold; color: #5b53ef; padding: 10px 0; font-size: 13px; margin: 0; text-transform: none">Scuba Diving for Two</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="padding: 0 0 15px 0; text-transform: none; background: #fff">If you’re called to explore the deep blue sea but have never been under before, this is the perfect way to get started. Beginners welcome!</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="padding: 10px 0; background: #fff"><span style="display: block; margin-bottom: 15px;"><a href="http://www.contentder.com" style="background: #5b53ef; padding: 10px 15px; color: #fff; border-radius: 3px; text-decoration: none; cursor: pointer;">Details</a></span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>
                                                                    <td style="padding: 15px;">
                                                                        <table style="width: 100%">
                                                                            <tr>
                                                                                <td style="padding: 0">
                                                                                    <table>
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td style="padding: 0">
                                                                                                    <p style="font-weight: bold; color: #5b53ef; padding: 10px 0; font-size: 13px; margin: 0; text-transform: none">Scuba Diving for Two</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="padding: 0 0 15px 0; text-transform: none; background: #fff">If you’re called to explore the deep blue sea but have never been under before, this is the perfect way to get started. Beginners welcome!</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="padding: 10px 0; background: #fff"><span style="display: block; margin-bottom: 15px"><a href="http://www.contentder.com" style="background: #5b53ef; padding: 10px 15px; color: #fff; border-radius: 3px; text-decoration: none; cursor: pointer;">Details</a></span></td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </table>
                                                                    </td>

                                                                </tr>

                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="border-top: 1px solid #ccc; padding: 15px; text-transform: none; background: #fff">
                                                        <span style="display: block; margin: 3px 0; text-transform: none">Contender Team</span>
                                                        <span style="display: block; margin: 3px 0; text-transform: none"><a href="http://www.sageframe.com">http://www.sageframe.com</a></span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="2" style="border-top: 1px solid #ccc; padding: 0"><span style="font: italic 12px Arial, Helvetica, sans-serif; color: #9fa2a8; display: block; padding: 10px">This message is confidential and intended for the recipient only. It is not allowed to copy this message, or to make it accessible for third parties. If you are not the intended recipient, please notify the sender by email.</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tr>
        </tbody>
    </table>

</div>
<div id="Paragraph">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac lacus ante. Sed et iaculis sapien, vitae interdum ante. Donec ut ullamcorper turpis, quis condimentum dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras quis justo sed dui dignissim imperdiet interdum eget urna. Nam ac aliquet metus. Sed eget ligula viverra, luctus libero nec, tincidunt quam. Donec in orci rhoncus, rutrum tortor interdum, ultrices tortor.</p>
</div>
<div id="LinkButton">
    <a href="http://www.contentder.com" style="background: #3caaff; font-size: 12px; padding: 5px; color: #fff; color: #fff; text-decoration: none; border: 1px solid #3198d2; border-radius: 5px; -webkit-box-shadow: inset 0 1px 0px rgba(255,255,255,0.32); -moz-box-shadow: inset 0 1px 0px rgba(255,255,255,0.32); box-shadow: inset 0 1px 0px rgba(255,255,255,0.32)">Double click to edit</a>
</div>
<div id="AdminLogo">
    <img src='<%=HostUrl%>/images/sageframe.png' />
</div>
<div id="LinkContent">
    <a href="http://www.contentder.com">Double click to edit</a>
</div>
<div id="UserName">
    <span>##Username##</span>
</div>
<div id="UserEmail">
    <span>##UserEmail##</span>
</div>
<div id="UserFName">
    <span>##UserFirstName##</span>
</div>
<div id="UserLName">
    <span>##UserLastName##</span>
</div>
<div id="Salutations">
    <p>Dear <span>##UserFirstName## ##UserLastName##</span>  , To whom it may concern</p>
</div>
<div id="Endingline">
    <p style="rgb(136,136,136); margin: 0">Best Regards</p>
    <p style="color: #000; font-weight: bold; font-size: 12px; margin: 0">lorem Ipsum salvador</p>
    <p style="color: rgb(106, 168, 79); font-size: 12px; margin: 0">Software Engineer, Sageframe</p>
</div>
<div id="Address">
    <span style="display: block">
        <img height="25" src="https://ci6.googleusercontent.com/proxy/m3hGi00E-zJNlvDCXVuDIXbIoRwzBziIDtvNd2BLdQiDmbJ4bbjh02WzDrCBWt8Og-Q2itJdaJMp94FbhEOGdWklU2w2Zf7jWAvBjgiulaI0oG3gHYTGLuimZrbZl7ww=s0-d-e1-ft#https://docs.google.com/uc?id=0B_BHxWfLB1kvTE9tNzc4bkxVLVE&amp;export=download" style="font-size: 12.8px; color: rgb(136,136,136)" width="96">
    <p style="rgb(106, 168, 79); margin: 0; font-size: 10.5px">Braindigit IT Solution (P) Ltd</p>
    <div>
        <span style="font-size: 10.5px; padding-right: 5px">Gyaneshwor, Kathmandu Nepal </span>
        <span style="font-size: 10.5px; padding: 0 5px">I </span>
        <span style="font-size: 10.5px; padding-right: 5px">Post Box: 422</span>
        <span style="font-size: 10.5px; padding: 0 5px">I</span>
        <span style="font-size: 10.5px; padding-right: 5px">Fax: 4224270</span>
    </div>
    <div>
        <span style="font-size: 10.5px; padding-right: 5px">Phone: +977-1-4441260 /  1-4410041   </span>
        <span style="font-size: 10.5px; padding: 0 5px">I </span>
        <span style="font-size: 10.5px; padding-right: 5px"><a href="http://braindigit.com/">URL: braindigit.com </a></span>
        <span style="font-size: 10.5px; padding: 0 5px">I</span>
        <span style="font-size: 10.5px; padding-right: 5px">Fax: 4224270</span>
    </div>
    <div>
        <span style="font-size: 10.5px;">
            <a href="https://www.google.com.np/maps/place/Braindigit+IT+Solution+Pvt+Ltd./@27.709302,85.3271813,17z/data=!3m1!4b1!4m5!3m4!1s0x39eb190bd75793cd:0x561a5d3607c15a03!8m2!3d27.709302!4d85.32937" style="color: rgb(17,85,204); font-size: 12.8px; background-image: url(<%=HostUrl%>/Modules/Admin/MessageManagement/SampleTemplate/img/mp.jpg); display: inline-block; width: 21px; height: 21px; text-indent: -99999px;" target="_blank">map</a></a> </span>
        <span style="font-size: 10.5px;"><a href="https://www.linkedin.com/company/249064?trk=tyah&amp;trkInfo=clickedVertical%3Acompany%2CclickedEntityId%3A249064%2Cidx%3A2-1-2%2CtarId%3A1479811933540%2Ctas%3ABraindi" style="color: rgb(17,85,204); font-size: 12.8px; background-image: url(<%=HostUrl%>/Modules/Admin/MessageManagement/SampleTemplate/img/ln.jpg); display: inline-block; width: 21px; height: 21px; text-indent: -99999px" target="_blank">Linked in</a> </span>
        <span style="font-size: 10.5px;"><a href="https://twitter.com/braindigitit" style="color: rgb(17,85,204); font-size: 12.8px; background-image: url(<%=HostUrl%>/Modules/Admin/MessageManagement/SampleTemplate/img/tw.jpg); display: inline-block; width: 21px; height: 21px; text-indent: -99999px" target="_blank">Twitter</a></span>
        <span style="font-size: 10.5px;"><a href="https://www.facebook.com/braindigit/" style="color: rgb(17,85,204); font-size: 12.8px; background-image: url(<%=HostUrl%>/Modules/Admin/MessageManagement/SampleTemplate/img/fb.jpg); display: inline-block; width: 21px; height: 21px; text-indent: -99999px" target="_blank">Facebook</a></span>
    </div>
</div>
<div id="emailDisclaimer">
    <p style="font-style: italic; color: #9e9e9e; font-size: 11px">This message is confidential. It may also be privileged or otherwise protected by work-product immunity or other legal rules. If you have received it by mistake, please let us know by email reply and delete it from your system; you may not copy this message or disclose its contents to anyone.</p>
</div>
