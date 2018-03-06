DECLARE @MaxPageID INT
SELECT @MaxPageID = MAX(PageID) FROM Pages
Declare @ModuleID_0_0 int;
Declare @ModuleDefID_0_0_0 int;
Declare @ModuleControlID_0_0_0_0 int;
Declare @ModuleControlID_1_0_0_0 int;
Declare @ModuleDefPermissionID_0_0_0_0 int;
Declare @ModuleDefPermissionID_1_0_0_0 int;
Declare @UserModuleID_0_0_0_0 int;
Declare @UserModulePermissionID_0_0_0_0_0 int;
Declare @UserModulePermissionID_1_0_0_0_0 int;
Declare @UserModulePermissionID_2_0_0_0_0 int;
Declare @UserModulePermissionID_3_0_0_0_0 int;
Declare @UserModuleID_1_0_0_0 int;
Declare @UserModulePermissionID_0_1_0_0_0 int;
Declare @UserModulePermissionID_1_1_0_0_0 int;
Declare @UserModulePermissionID_2_1_0_0_0 int;
Declare @UserModulePermissionID_3_1_0_0_0 int;
Declare @UserModuleID_2_0_0_0 int;
Declare @UserModulePermissionID_0_2_0_0_0 int;
Declare @UserModulePermissionID_1_2_0_0_0 int;
Declare @UserModulePermissionID_2_2_0_0_0 int;
Declare @UserModulePermissionID_3_2_0_0_0 int;
Declare @UserModuleID_3_0_0_0 int;
Declare @UserModulePermissionID_0_3_0_0_0 int;
Declare @UserModulePermissionID_1_3_0_0_0 int;
Declare @UserModulePermissionID_2_3_0_0_0 int;
Declare @UserModulePermissionID_3_3_0_0_0 int;
Declare @ModuleID_1_0 int;
Declare @ModuleDefID_0_1_0 int;
Declare @ModuleControlID_0_0_1_0 int;
Declare @ModuleDefPermissionID_0_0_1_0 int;
Declare @ModuleDefPermissionID_1_0_1_0 int;
Declare @UserModuleID_0_0_1_0 int;
Declare @UserModulePermissionID_0_0_0_1_0 int;
Declare @UserModulePermissionID_1_0_0_1_0 int;
Declare @UserModulePermissionID_2_0_0_1_0 int;
Declare @UserModulePermissionID_3_0_0_1_0 int;
Declare @ModuleID_2_0 int;
Declare @ModuleDefID_0_2_0 int;
Declare @ModuleControlID_0_0_2_0 int;
Declare @ModuleDefPermissionID_0_0_2_0 int;
Declare @ModuleDefPermissionID_1_0_2_0 int;
Declare @UserModuleID_0_0_2_0 int;
Declare @UserModulePermissionID_0_0_0_2_0 int;
Declare @UserModulePermissionID_1_0_0_2_0 int;
Declare @UserModulePermissionID_2_0_0_2_0 int;
Declare @UserModulePermissionID_3_0_0_2_0 int;
Declare @ModuleID_3_0 int;
Declare @ModuleDefID_0_3_0 int;
Declare @ModuleControlID_0_0_3_0 int;
Declare @ModuleDefPermissionID_0_0_3_0 int;
Declare @ModuleDefPermissionID_1_0_3_0 int;
Declare @UserModuleID_0_0_3_0 int;
Declare @UserModulePermissionID_0_0_0_3_0 int;
Declare @UserModulePermissionID_1_0_0_3_0 int;
Declare @UserModulePermissionID_2_0_0_3_0 int;
Declare @UserModulePermissionID_3_0_0_3_0 int;
Declare @ModuleID_4_0 int;
Declare @ModuleDefID_0_4_0 int;
Declare @ModuleControlID_0_0_4_0 int;
Declare @ModuleDefPermissionID_0_0_4_0 int;
Declare @ModuleDefPermissionID_1_0_4_0 int;
Declare @UserModuleID_0_0_4_0 int;
Declare @UserModulePermissionID_0_0_0_4_0 int;
Declare @UserModulePermissionID_1_0_0_4_0 int;
Declare @UserModulePermissionID_2_0_0_4_0 int;
Declare @UserModulePermissionID_3_0_0_4_0 int;
Declare @PageID_0_0 int;
Declare @PagePermissionID_0_0_0 int;
Declare @PagePermissionID_1_0_0 int;
Declare @PagePermissionID_2_0_0 int;
Declare @PagePermissionID_3_0_0 int;
Declare @PageModuleID_0_0_0 int;
Declare @PageModuleID_1_0_0 int;
Declare @PageID_1_0 int;
Declare @PagePermissionID_0_1_0 int;
Declare @PagePermissionID_1_1_0 int;
Declare @PagePermissionID_2_1_0 int;
Declare @PagePermissionID_3_1_0 int;
Declare @PageModuleID_0_1_0 int;
Declare @PageModuleID_1_1_0 int;
Declare @PageID_2_0 int;
Declare @PagePermissionID_0_2_0 int;
Declare @PagePermissionID_1_2_0 int;
Declare @PagePermissionID_2_2_0 int;
Declare @PagePermissionID_3_2_0 int;
Declare @PageModuleID_0_2_0 int;
Declare @PageModuleID_1_2_0 int;
Declare @PageID_3_0 int;
Declare @PagePermissionID_0_3_0 int;
Declare @PagePermissionID_1_3_0 int;
Declare @PagePermissionID_2_3_0 int;
Declare @PagePermissionID_3_3_0 int;
Declare @PageModuleID_0_3_0 int;
Declare @PageModuleID_1_3_0 int;

IF(NOT EXISTS (SELECT 1 FROM Modules WHERE FriendlyName=N'DashboardSideMenu' AND IsActive=1))BEGIN 
INSERT INTO Modules (FriendlyName, Description, Version, IsPremium, IsAdmin, IsRequired, BusinessControllerClass, FolderName, ModuleName, SupportedFeatures, CompatibleVersions, Dependencies, Permissions, PackageID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'DashboardSideMenu',N'DashboardSideMenu',N'01.00.00',1,1,NULL,N'',N'Admin/DashboardSideMenu',N'Admin.DashboardSideMenu',0,N'',N'',N'',1112,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleID_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleID_0_0 = ModuleID FROM Modules  WHERE FriendlyName=N'DashboardSideMenu' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefinitions WHERE FriendlyName=N'DashboardSideMenu' AND IsActive=1))BEGIN 
INSERT INTO ModuleDefinitions (FriendlyName, ModuleID, DefaultCacheTime, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'DashboardSideMenu',@ModuleID_0_0,0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefID_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefID_0_0_0 = ModuleDefID FROM ModuleDefinitions  WHERE FriendlyName=N'DashboardSideMenu' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleControls WHERE ModuleDefID=@ModuleDefID_0_0_0))BEGIN 
INSERT INTO ModuleControls (ModuleDefID, ControlKey, ControlTitle, ControlSrc, IconFile, ControlType, DisplayOrder, HelpUrl, SupportsPartialRendering, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_0_0,N'View',N'DashboardSideMenu',N'Modules/Admin/DashboardSideMenu/DashboardLink.ascx',N'',1,0,N'',0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleControlID_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleControlID_0_0_0_0 = ModuleControlID FROM ModuleControls  WHERE ModuleDefID=@ModuleDefID_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM ModuleControls WHERE ModuleDefID=@ModuleDefID_0_0_0))BEGIN 
INSERT INTO ModuleControls (ModuleDefID, ControlKey, ControlTitle, ControlSrc, IconFile, ControlType, DisplayOrder, HelpUrl, SupportsPartialRendering, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_0_0,N'Edit',N'DashboardSideMenu',N'Modules/Admin/DashboardSideMenu/DashboardLinkEdit.ascx',N'',2,0,N'',0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleControlID_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleControlID_1_0_0_0 = ModuleControlID FROM ModuleControls  WHERE ModuleDefID=@ModuleDefID_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_0_0 AND PermissionID=1))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_0_0,1,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_0_0_0_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_0_0 AND PermissionID=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_0_0 AND PermissionID=2))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_0_0,2,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_1_0_0_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_0_0 AND PermissionID=2
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_0_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_0_0,N'DashboardSideMenu',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'DashboardSideMenu',N'2142',0,N' ',N'',0,1) 
Set @UserModuleID_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_0_0_0_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_0_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_0_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_0_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_0_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_0_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_0_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_0_0,N'DashboardSideMenu',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'DashboardSideMenu',N'2145',0,N' ',N'',0,1) 
Set @UserModuleID_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_1_0_0_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_1_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_1_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_1_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_1_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_1_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_1_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_1_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_1_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_1_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_1_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_0_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_0_0,N'DashboardSideMenu',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'DashboardSideMenu',N'2143',0,N' ',N'',0,1) 
Set @UserModuleID_2_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_2_0_0_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_2_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_2_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_2_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_2_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_2_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_2_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_2_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_2_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_2_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_2_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_2_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_2_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_2_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_0_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_0_0,N'DashboardSideMenu',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'DashboardSideMenu',N'2144',0,N' ',N'',0,1) 
Set @UserModuleID_3_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_3_0_0_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_3_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_3_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_3_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_3_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_3_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_3_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_3_0_0_0,@ModuleDefPermissionID_0_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_3_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_3_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_3_0_0_0,@ModuleDefPermissionID_1_0_0_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_3_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_3_0_0_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_3_0_0_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM Modules WHERE FriendlyName=N'Category Setting' AND IsActive=1))BEGIN 
INSERT INTO Modules (FriendlyName, Description, Version, IsPremium, IsAdmin, IsRequired, BusinessControllerClass, FolderName, ModuleName, SupportedFeatures, CompatibleVersions, Dependencies, Permissions, PackageID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Category Setting',N'',N'01.00.00',1,0,NULL,N'',N'ArticleAdmin/ArticleSetting',N'ArticleAdmin.ArticleSetting',0,N'',N'',N'',1135,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleID_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleID_1_0 = ModuleID FROM Modules  WHERE FriendlyName=N'Category Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefinitions WHERE FriendlyName=N'Category Setting' AND IsActive=1))BEGIN 
INSERT INTO ModuleDefinitions (FriendlyName, ModuleID, DefaultCacheTime, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Category Setting',@ModuleID_1_0,0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefID_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefID_0_1_0 = ModuleDefID FROM ModuleDefinitions  WHERE FriendlyName=N'Category Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleControls WHERE ModuleDefID=@ModuleDefID_0_1_0))BEGIN 
INSERT INTO ModuleControls (ModuleDefID, ControlKey, ControlTitle, ControlSrc, IconFile, ControlType, DisplayOrder, HelpUrl, SupportsPartialRendering, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_1_0,N'Category Setting',N'Category Setting',N'Modules/ArticleAdmin/ArticleSetting/CategorySetting.ascx',N'',1,0,N'',0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleControlID_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleControlID_0_0_1_0 = ModuleControlID FROM ModuleControls  WHERE ModuleDefID=@ModuleDefID_0_1_0
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_1_0 AND PermissionID=1))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_1_0,1,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_0_0_1_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_1_0 AND PermissionID=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_1_0 AND PermissionID=2))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_1_0,2,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_1_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_1_0_1_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_1_0 AND PermissionID=2
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_1_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_1_0,N'Category Setting',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'Category_Setting',N'2142',0,N' ',N'',0,1) 
Set @UserModuleID_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_0_0_1_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_1_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_1_0,@ModuleDefPermissionID_0_0_1_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_0_0_1_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_1_0,@ModuleDefPermissionID_1_0_1_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_0_0_1_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_1_0,@ModuleDefPermissionID_0_0_1_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_0_0_1_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_1_0,@ModuleDefPermissionID_1_0_1_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_0_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_0_0_1_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_1_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM Modules WHERE FriendlyName=N'Article Master Setting' AND IsActive=1))BEGIN 
INSERT INTO Modules (FriendlyName, Description, Version, IsPremium, IsAdmin, IsRequired, BusinessControllerClass, FolderName, ModuleName, SupportedFeatures, CompatibleVersions, Dependencies, Permissions, PackageID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Article Master Setting',N'',N'01.00.00',1,0,NULL,N'',N'ArticleAdmin/ArticleSetting',N'ArticleAdmin.ArticleSetting',0,N'',N'',N'',1138,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleID_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleID_2_0 = ModuleID FROM Modules  WHERE FriendlyName=N'Article Master Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefinitions WHERE FriendlyName=N'Article Master Setting' AND IsActive=1))BEGIN 
INSERT INTO ModuleDefinitions (FriendlyName, ModuleID, DefaultCacheTime, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Article Master Setting',@ModuleID_2_0,0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefID_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefID_0_2_0 = ModuleDefID FROM ModuleDefinitions  WHERE FriendlyName=N'Article Master Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleControls WHERE ModuleDefID=@ModuleDefID_0_2_0))BEGIN 
INSERT INTO ModuleControls (ModuleDefID, ControlKey, ControlTitle, ControlSrc, IconFile, ControlType, DisplayOrder, HelpUrl, SupportsPartialRendering, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_2_0,N'Article Master Setting',N'Article Master Setting',N'Modules/ArticleAdmin/ArticleSetting/ArticleMasterSetting.ascx',N'',1,0,N'',0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleControlID_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleControlID_0_0_2_0 = ModuleControlID FROM ModuleControls  WHERE ModuleDefID=@ModuleDefID_0_2_0
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_2_0 AND PermissionID=1))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_2_0,1,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_0_0_2_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_2_0 AND PermissionID=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_2_0 AND PermissionID=2))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_2_0,2,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_1_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_1_0_2_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_2_0 AND PermissionID=2
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_2_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_2_0,N'Article Master Setting',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'Article_Master Setting',N'2144',0,N' ',N'',0,1) 
Set @UserModuleID_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_0_0_2_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_2_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_2_0,@ModuleDefPermissionID_0_0_2_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_0_0_2_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_2_0,@ModuleDefPermissionID_1_0_2_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_0_0_2_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_2_0,@ModuleDefPermissionID_0_0_2_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_0_0_2_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_2_0,@ModuleDefPermissionID_1_0_2_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_0_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_0_0_2_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_2_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM Modules WHERE FriendlyName=N'Article Brand' AND IsActive=1))BEGIN 
INSERT INTO Modules (FriendlyName, Description, Version, IsPremium, IsAdmin, IsRequired, BusinessControllerClass, FolderName, ModuleName, SupportedFeatures, CompatibleVersions, Dependencies, Permissions, PackageID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Article Brand',N'',N'01.00.00',1,0,NULL,N'',N'ArticleAdmin/ArticleSetting',N'ArticleAdmin.ArticleSetting',0,N'',N'',N'',1139,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleID_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleID_3_0 = ModuleID FROM Modules  WHERE FriendlyName=N'Article Brand' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefinitions WHERE FriendlyName=N'Article Brand' AND IsActive=1))BEGIN 
INSERT INTO ModuleDefinitions (FriendlyName, ModuleID, DefaultCacheTime, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Article Brand',@ModuleID_3_0,0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefID_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefID_0_3_0 = ModuleDefID FROM ModuleDefinitions  WHERE FriendlyName=N'Article Brand' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleControls WHERE ModuleDefID=@ModuleDefID_0_3_0))BEGIN 
INSERT INTO ModuleControls (ModuleDefID, ControlKey, ControlTitle, ControlSrc, IconFile, ControlType, DisplayOrder, HelpUrl, SupportsPartialRendering, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_3_0,N'Article Brand',N'Article Brand',N'Modules/ArticleAdmin/ArticleSetting/BrandSetting.ascx',N'',1,0,N'',0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleControlID_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleControlID_0_0_3_0 = ModuleControlID FROM ModuleControls  WHERE ModuleDefID=@ModuleDefID_0_3_0
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_3_0 AND PermissionID=1))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_3_0,1,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_0_0_3_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_3_0 AND PermissionID=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_3_0 AND PermissionID=2))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_3_0,2,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_1_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_1_0_3_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_3_0 AND PermissionID=2
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_3_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_3_0,N'Article Brand',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'Article_Brand',N'2143',0,N' ',N'',0,1) 
Set @UserModuleID_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_0_0_3_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_3_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_3_0,@ModuleDefPermissionID_0_0_3_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_0_0_3_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_3_0,@ModuleDefPermissionID_1_0_3_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_0_0_3_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_3_0,@ModuleDefPermissionID_0_0_3_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_0_0_3_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_3_0,@ModuleDefPermissionID_1_0_3_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_0_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_0_0_3_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_3_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM Modules WHERE FriendlyName=N'Article Type Setting' AND IsActive=1))BEGIN 
INSERT INTO Modules (FriendlyName, Description, Version, IsPremium, IsAdmin, IsRequired, BusinessControllerClass, FolderName, ModuleName, SupportedFeatures, CompatibleVersions, Dependencies, Permissions, PackageID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Article Type Setting',N'',N'01.00.00',1,0,NULL,N'',N'ArticleAdmin/ArticleSetting',N'ArticleAdmin.ArticleSetting',0,N'',N'',N'',1140,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleID_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleID_4_0 = ModuleID FROM Modules  WHERE FriendlyName=N'Article Type Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefinitions WHERE FriendlyName=N'Article Type Setting' AND IsActive=1))BEGIN 
INSERT INTO ModuleDefinitions (FriendlyName, ModuleID, DefaultCacheTime, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (N'Article Type Setting',@ModuleID_4_0,0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefID_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefID_0_4_0 = ModuleDefID FROM ModuleDefinitions  WHERE FriendlyName=N'Article Type Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleControls WHERE ModuleDefID=@ModuleDefID_0_4_0))BEGIN 
INSERT INTO ModuleControls (ModuleDefID, ControlKey, ControlTitle, ControlSrc, IconFile, ControlType, DisplayOrder, HelpUrl, SupportsPartialRendering, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_4_0,N'Article Type Setting',N'Article Type Setting',N'Modules/ArticleAdmin/ArticleSetting/ArticleTypeSetting.ascx',N'',1,0,N'',0,1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @ModuleControlID_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleControlID_0_0_4_0 = ModuleControlID FROM ModuleControls  WHERE ModuleDefID=@ModuleDefID_0_4_0
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_4_0 AND PermissionID=1))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_4_0,1,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_0_0_4_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_4_0 AND PermissionID=1
END

IF(NOT EXISTS (SELECT 1 FROM ModuleDefPermission WHERE ModuleDefID=@ModuleDefID_0_4_0 AND PermissionID=2))BEGIN 
INSERT INTO ModuleDefPermission (ModuleDefID, PermissionID, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@ModuleDefID_0_4_0,2,1,NULL,NULL,GetDate(),NULL,NULL,1,N'superuser',NULL,NULL) 
Set @ModuleDefPermissionID_1_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @ModuleDefPermissionID_1_0_4_0 = ModuleDefPermissionID FROM ModuleDefPermission  WHERE ModuleDefID=@ModuleDefID_0_4_0 AND PermissionID=2
END

IF(NOT EXISTS (SELECT 1 FROM UserModules WHERE ModuleDefID=@ModuleDefID_0_4_0))BEGIN 
INSERT INTO UserModules (ModuleDefID, UserModuleTitle, AllPages, InheritViewPermissions, Header, Footer, StartDate, EndDate, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, ShowInPages, IsHandheld, SuffixClass, HeaderText, ShowHeaderText, IsInAdmin) VALUES (@ModuleDefID_0_4_0,N'Article Type Setting',0,1,NULL,NULL,NULL,NULL,1,NULL,NULL,GetDate(),NULL,NULL,1,N'1',NULL,NULL,N'Article_Type Setting',N'2145',0,N' ',N'',0,1) 
Set @UserModuleID_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModuleID_0_0_4_0 = UserModuleID FROM UserModules  WHERE ModuleDefID=@ModuleDefID_0_4_0
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_4_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_4_0,@ModuleDefPermissionID_0_0_4_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_0_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_0_0_0_4_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_4_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_4_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_4_0,@ModuleDefPermissionID_1_0_4_0,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_1_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_1_0_0_4_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_4_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_4_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_4_0,@ModuleDefPermissionID_0_0_4_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_2_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_2_0_0_4_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_0_0_4_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM UserModulePermission WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_4_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO UserModulePermission (UserModuleID, ModuleDefPermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@UserModuleID_0_0_4_0,@ModuleDefPermissionID_1_0_4_0,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',1,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @UserModulePermissionID_3_0_0_4_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @UserModulePermissionID_3_0_0_4_0 = UserModulePermissionID FROM UserModulePermission  WHERE UserModuleID=@UserModuleID_0_0_4_0 AND MOduledefPermissionID=@ModuleDefPermissionID_1_0_4_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM Pages WHERE PageName=N'Article Category' AND IsActive=1))BEGIN 
INSERT INTO Pages (PageOrder, PageName, IsVisible, ParentID, Level, IconFile, DisableLink, Title, Description, KeyWords, Url, TabPath, StartDate, EndDate, RefreshInterval, PageHeadText, IsSecure, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, IsShowInFooter, IsRequiredPage, SiteID) VALUES (6,N'Article Category',0,2,1,N'',0,N'Article Category',N'Contentder',N'EasyBuilder',N'',N'/Admin/Article-Category',GetDate(),GetDate(),0.00,N'SageFrame',0,1,0,1,GetDate(),GetDate(),NULL,-1,N'superuser',N'superuser',NULL,N'Article-Category',0,0,NULL) 
Set @PageID_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageID_0_0 = PageID FROM Pages  WHERE PageName=N'Article Category' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_0_0,1,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_0_0_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_0_0,2,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_1_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_1_0_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_0_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_0_0,1,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_2_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_2_0_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_0_0,2,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_3_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_3_0_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_0_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_0_0 AND UserModuleID=@UserModuleID_0_0_1_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_0_0,@UserModuleID_0_0_1_0,N'cpanel',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_0_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_0_0_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_0_0 AND UserModuleID=@UserModuleID_0_0_1_0
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_0_0 AND UserModuleID=@UserModuleID_0_0_0_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_0_0,@UserModuleID_0_0_0_0,N'dashboardsidenav',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_1_0_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_1_0_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_0_0 AND UserModuleID=@UserModuleID_0_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM Pages WHERE PageName=N'Article Brand' AND IsActive=1))BEGIN 
INSERT INTO Pages (PageOrder, PageName, IsVisible, ParentID, Level, IconFile, DisableLink, Title, Description, KeyWords, Url, TabPath, StartDate, EndDate, RefreshInterval, PageHeadText, IsSecure, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, IsShowInFooter, IsRequiredPage, SiteID) VALUES (55,N'Article Brand',0,2,1,N'',0,N'Article Brand',N'Contentder',N'EasyBuilder',N'',N'/Admin/Article-Brand',GetDate(),GetDate(),0.00,N'SageFrame',0,1,0,NULL,GetDate(),NULL,NULL,-1,N'superuser',NULL,NULL,N'Article-Brand',0,0,NULL) 
Set @PageID_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageID_1_0 = PageID FROM Pages  WHERE PageName=N'Article Brand' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_1_0,1,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_0_1_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_1_0,2,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_1_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_1_1_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_1_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_1_0,1,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_2_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_2_1_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_1_0,2,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_3_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_3_1_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_1_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_1_0 AND UserModuleID=@UserModuleID_0_0_3_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_1_0,@UserModuleID_0_0_3_0,N'cpanel',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_0_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_0_1_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_1_0 AND UserModuleID=@UserModuleID_0_0_3_0
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_1_0 AND UserModuleID=@UserModuleID_2_0_0_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_1_0,@UserModuleID_2_0_0_0,N'dashboardsidenav',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_1_1_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_1_1_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_1_0 AND UserModuleID=@UserModuleID_2_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM Pages WHERE PageName=N'Article Setting' AND IsActive=1))BEGIN 
INSERT INTO Pages (PageOrder, PageName, IsVisible, ParentID, Level, IconFile, DisableLink, Title, Description, KeyWords, Url, TabPath, StartDate, EndDate, RefreshInterval, PageHeadText, IsSecure, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, IsShowInFooter, IsRequiredPage, SiteID) VALUES (56,N'Article Setting',0,2,1,N'',0,N'Article Setting',N'Contentder',N'EasyBuilder',N'',N'/Admin/Article-Setting',GetDate(),GetDate(),0.00,N'SageFrame',0,1,0,NULL,GetDate(),NULL,NULL,-1,N'superuser',NULL,NULL,N'Article-Setting',0,0,NULL) 
Set @PageID_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageID_2_0 = PageID FROM Pages  WHERE PageName=N'Article Setting' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_2_0,1,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_0_2_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_2_0,2,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_1_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_1_2_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_2_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_2_0,1,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_2_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_2_2_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_2_0,2,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_3_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_3_2_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_2_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_2_0 AND UserModuleID=@UserModuleID_0_0_2_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_2_0,@UserModuleID_0_0_2_0,N'cpanel',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_0_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_0_2_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_2_0 AND UserModuleID=@UserModuleID_0_0_2_0
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_2_0 AND UserModuleID=@UserModuleID_3_0_0_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_2_0,@UserModuleID_3_0_0_0,N'dashboardsidenav',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_1_2_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_1_2_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_2_0 AND UserModuleID=@UserModuleID_3_0_0_0
END

IF(NOT EXISTS (SELECT 1 FROM Pages WHERE PageName=N'Article Type' AND IsActive=1))BEGIN 
INSERT INTO Pages (PageOrder, PageName, IsVisible, ParentID, Level, IconFile, DisableLink, Title, Description, KeyWords, Url, TabPath, StartDate, EndDate, RefreshInterval, PageHeadText, IsSecure, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy, SEOName, IsShowInFooter, IsRequiredPage, SiteID) VALUES (54,N'Article Type',0,2,1,N'',0,N'Article Type',N'Contentder',N'EasyBuilder',N'',N'/Admin/Article-Type',GetDate(),GetDate(),0.00,N'SageFrame',0,1,0,NULL,GetDate(),NULL,NULL,-1,N'superuser',NULL,NULL,N'Article-Type',0,0,NULL) 
Set @PageID_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageID_3_0 = PageID FROM Pages  WHERE PageName=N'Article Type' AND IsActive=1
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_3_0,1,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_0_3_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_3_0,2,1,N'cd3ca2e2-7120-44ad-a520-394e76aac552',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_1_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_1_3_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_3_0 AND RoleID=N'cd3ca2e2-7120-44ad-a520-394e76aac552'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_3_0,1,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_2_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_2_3_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PagePermission WHERE PageID=@PageID_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'))BEGIN 
INSERT INTO PagePermission (PageID, PermissionID, AllowAccess, RoleID, Username, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_3_0,2,1,N'910f0c31-e1dd-42d2-988b-545fe8621544',N'',0,0,0,GetDate(),GetDate(),NULL,1,N'superuser',NULL,NULL) 
Set @PagePermissionID_3_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PagePermissionID_3_3_0 = PagePermissionID FROM PagePermission  WHERE PageID=@PageID_3_0 AND RoleID=N'910f0c31-e1dd-42d2-988b-545fe8621544'
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_3_0 AND UserModuleID=@UserModuleID_0_0_4_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_3_0,@UserModuleID_0_0_4_0,N'cpanel',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_0_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_0_3_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_3_0 AND UserModuleID=@UserModuleID_0_0_4_0
END

IF(NOT EXISTS (SELECT 1 FROM PageModules WHERE PageID=@PageID_3_0 AND UserModuleID=@UserModuleID_1_0_0_0))BEGIN 
INSERT INTO PageModules (PageID, UserModuleID, PaneName, ModuleOrder, CacheTime, Alignment, Color, Border, IconFile, Visibility, DisplayTitle, DisplayPrint, IsActive, IsDeleted, IsModified, AddedOn, UpdatedOn, DeletedOn, PortalID, AddedBy, UpdatedBy, DeletedBy) VALUES (@PageID_3_0,@UserModuleID_1_0_0_0,N'dashboardsidenav',1,10,N'test',N'black',N'',N'none',1,1,1,1,0,0,GetDate(),GetDate(),NULL,-1,N'superuser',NULL,NULL) 
Set @PageModuleID_1_3_0= SCOPE_IDENTITY()END 
ELSE 
BEGIN SELECT @PageModuleID_1_3_0 = PageModuleID FROM PageModules  WHERE PageID=@PageID_3_0 AND UserModuleID=@UserModuleID_1_0_0_0
END

DECLARE @PageList TABLE(PageID int)
DECLARE @LinkID INT
INSERT INTO @PageList 
SELECT PageID FROM pages WHERE PageID NOT IN (SELECT PageID FROM dbo.PageMenu) AND PageID > @MaxPageID
INSERT INTO dbo.PageMenu
SELECT PageID,1,1,0,1 FROM pages WHERE PageID NOT IN (SELECT PageID FROM dbo.PageMenu) AND PageID > @MaxPageID
INSERT INTO dbo.PagePreview
SELECT PageID,NEWID() FROM pages WHERE PageID NOT IN (SELECT PageID FROM dbo.PagePreview) AND PageID > @MaxPageID
