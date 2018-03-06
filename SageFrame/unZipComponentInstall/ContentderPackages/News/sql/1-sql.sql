
/****** Object:  Table [dbo].[Article]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article](
	[ArticleID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](250) NOT NULL,
	[Summary] [nvarchar](500) NULL,
	[Detail] [nvarchar](max) NULL,
	[NewsSource] [nvarchar](50) NULL,
	[Quotation] [nvarchar](256) NULL,
	[StateID] [int] NOT NULL,
	[ArticleEntryType] [int] NULL,
	[PublishDate] [datetime] NULL,
	[OpinionBy] [nvarchar](256) NULL,
	[Location] [nvarchar](250) NULL,
	[DetailsEditDOM] [nvarchar](max) NULL,
	[DetailsViewDOM] [nvarchar](max) NULL,
	[AssignTo] [nvarchar](256) NULL,
	[IsBlog] [bit] NOT NULL,
	[CultureCode] [nvarchar](50) NULL,
	[AddedBy] [nvarchar](256) NULL,
	[AddedOn] [datetime] NULL,
	[UpdatdOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[IsCustomReport] [bit] NOT NULL,
	[CustomReport] [nvarchar](256) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article] PRIMARY KEY CLUSTERED 
(
	[ArticleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_ActivityLog]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_ActivityLog](
	[ActivityLogID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NULL,
	[ActivityDate] [datetime] NULL,
	[Message] [nvarchar](250) NULL,
	[StateID] [int] NULL,
	[AddedBy] [nvarchar](250) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_ActivityLog] PRIMARY KEY CLUSTERED 
(
	[ActivityLogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Advertisment]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Advertisment](
	[AdvsID] [int] IDENTITY(1,1) NOT NULL,
	[BrandID] [int] NULL,
	[Size] [int] NULL,
	[MobileSize] [int] NULL,
	[DefaultFileName] [nvarchar](50) NULL,
	[MobileFileName] [nvarchar](50) NULL,
	[StartDate] [date] NULL,
	[EndDate] [date] NULL,
	[IsNoExpire] [bit] NULL,
	[DetailLink] [nvarchar](250) NULL,
	[Remarks] [nvarchar](250) NULL,
	[AddedBy] [nvarchar](250) NULL,
	[AddedOn] [date] NULL,
	[UpdatedBy] [nvarchar](250) NULL,
	[UpdatedOn] [date] NULL,
	[IsDeleted] [bit] NULL,
	[DeletedBy] [nvarchar](250) NULL,
	[DeletedOn] [date] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Advertisment] PRIMARY KEY CLUSTERED 
(
	[AdvsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_advs_ArticleCategoryMap]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_advs_ArticleCategoryMap](
	[AdvMapID] [int] IDENTITY(1,1) NOT NULL,
	[AdvsID] [int] NULL,
	[CategoryID] [int] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_advs_ArticleCategoryMap] PRIMARY KEY CLUSTERED 
(
	[AdvMapID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Advs_Brand]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Advs_Brand](
	[BrandID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NULL,
	[IconImage] [nvarchar](50) NULL,
	[AddedOn] [date] NULL,
	[AddedBy] [nvarchar](250) NULL,
	[UpdatedBy] [nvarchar](250) NULL,
	[UpdatedOn] [date] NULL,
	[IsDeleted] [bit] NULL,
	[DeletedBy] [nvarchar](250) NULL,
	[DeletedOn] [date] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Advs_Brand] PRIMARY KEY CLUSTERED 
(
	[BrandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Advs_Sizes]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Advs_Sizes](
	[SizeID] [int] IDENTITY(1,1) NOT NULL,
	[Size] [nvarchar](50) NULL,
	[MobileSize] [nvarchar](50) NULL,
	[AddedBy] [nvarchar](50) NULL,
	[AddedOn] [date] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Advs_Sizes] PRIMARY KEY CLUSTERED 
(
	[SizeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_AgendaContent]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_AgendaContent](
	[AgendaContentID] [int] IDENTITY(1,1) NOT NULL,
	[AgendaTitleID] [int] NOT NULL,
	[AgendaContent] [nvarchar](500) NOT NULL,
	[CultureCode] [nvarchar](50) NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NOT NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[IsDeleted] [bit] NOT NULL,
	[DeletedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Agenda] PRIMARY KEY CLUSTERED 
(
	[AgendaContentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_AgendaTitle]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_AgendaTitle](
	[AgendaTitleID] [int] IDENTITY(1,1) NOT NULL,
	[AgendaTitle] [nvarchar](250) NOT NULL,
	[IsActive] [bit] NULL,
	[AgendaFor] [date] NOT NULL,
	[IsDeleted] [bit] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[DeletedOn] [datetime] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_AgendaMapping] PRIMARY KEY CLUSTERED 
(
	[AgendaTitleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_AuthorMapping]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_AuthorMapping](
	[ArticleAuthorID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NULL,
	[UserID] [uniqueidentifier] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_AuthorMapping] PRIMARY KEY CLUSTERED 
(
	[ArticleAuthorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Category]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Category](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](100) NOT NULL,
	[Icon] [nvarchar](50) NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[DeletedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[IsDeleted] [bit] NULL,
	[IsBlog] [bit] NOT NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Category] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_CategoryMapping]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_CategoryMapping](
	[CategoryMappingID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NOT NULL,
	[CategoryID] [int] NOT NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_CategoryMapping] PRIMARY KEY CLUSTERED 
(
	[CategoryMappingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Comment]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Comment](
	[ArticleCommentID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NOT NULL,
	[CommentBy] [nvarchar](100) NULL,
	[Email] [nvarchar](250) NULL,
	[CommentText] [nvarchar](500) NULL,
	[IsActive] [bit] NOT NULL,
	[IsApproved] [bit] NOT NULL,
	[ApprovedBy] [nvarchar](256) NULL,
	[ApprovedOn] [datetime] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_ArticleComment] PRIMARY KEY CLUSTERED 
(
	[ArticleCommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_EntryFormType]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_EntryFormType](
	[EntryTypeID] [int] IDENTITY(1,1) NOT NULL,
	[EntryType] [nvarchar](50) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_EntryFormType] PRIMARY KEY CLUSTERED 
(
	[EntryTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_ExternalLinks]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_ExternalLinks](
	[LinkID] [bigint] IDENTITY(1,1) NOT NULL,
	[ArticleID] [bigint] NULL,
	[LinkURL] [nvarchar](250) NULL,
	[LinkType] [nvarchar](50) NULL,
	[MediaType] [nvarchar](20) NULL,
	[AddedBy] [nvarchar](256) NULL,
	[AddedOn] [date] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_ExternalLinks] PRIMARY KEY CLUSTERED 
(
	[LinkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Media]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Media](
	[MediaID] [bigint] IDENTITY(1,1) NOT NULL,
	[ArticleID] [bigint] NULL,
	[MediaType] [nvarchar](20) NULL,
	[MediaTitle] [nvarchar](250) NULL,
	[FileName] [nvarchar](100) NULL,
	[Source] [nvarchar](100) NULL,
	[Description] [nvarchar](250) NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[IsBlog] [bit] NULL,
	[IsActive] [bit] NULL,
	[IsForSummary] [bit] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_ArticleImage] PRIMARY KEY CLUSTERED 
(
	[MediaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_QuickMenu]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Article_QuickMenu](
	[MenuID] [int] IDENTITY(1,1) NOT NULL,
	[MenuTitle] [nvarchar](250) NOT NULL,
	[MenuUrl] [nvarchar](250) NOT NULL,
	[MenuDescription] [nvarchar](500) NULL,
	[IsActive] [bit] NULL,
	[UserModuleID] [int] NULL,
	[PortalID] [int] NULL,
	[CultureCode] [varchar](20) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_QuickMenu] PRIMARY KEY CLUSTERED 
(
	[MenuID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

/****** Object:  Table [dbo].[Article_RecycleBin]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_RecycleBin](
	[TrashArticleID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](250) NOT NULL,
	[Summary] [nvarchar](500) NULL,
	[Detail] [nvarchar](max) NULL,
	[NewsSource] [nvarchar](50) NULL,
	[Quotation] [nvarchar](256) NULL,
	[StateID] [int] NOT NULL,
	[ArticleEntryType] [int] NULL,
	[PublishDate] [datetime] NULL,
	[OpinionBy] [nvarchar](256) NULL,
	[Location] [nvarchar](250) NULL,
	[DetailsEditDOM] [nvarchar](max) NULL,
	[DetailsViewDOM] [nvarchar](max) NULL,
	[AssignTo] [nvarchar](256) NULL,
	[IsBlog] [bit] NOT NULL,
	[CultureCode] [nvarchar](50) NULL,
	[AddedBy] [nvarchar](256) NULL,
	[AddedOn] [datetime] NULL,
	[UpdatdOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[IsCustomReport] [bit] NOT NULL,
	[CustomReport] [nvarchar](256) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_TrashArticleID] PRIMARY KEY CLUSTERED 
(
	[TrashArticleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Setting]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Setting](
	[ArticleSettingID] [int] IDENTITY(1,1) NOT NULL,
	[SettingKey] [nvarchar](50) NULL,
	[SettingValue] [nvarchar](256) NULL,
	[IsDeleted] [bit] NOT NULL,
	[IsModified] [bit] NOT NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[DeletedOn] [datetime] NULL,
	[IsBlog] [bit] NOT NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_ArticleSetting_1] PRIMARY KEY CLUSTERED 
(
	[ArticleSettingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_SocialComment]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_SocialComment](
	[ArticleSocialCommentID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NOT NULL,
	[CommentCount] [int] NOT NULL,
	[SiteID] [int] NOT NULL,
 CONSTRAINT [PK_ArticleSocialComment] PRIMARY KEY CLUSTERED 
(
	[ArticleSocialCommentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_State]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_State](
	[StateID] [int] IDENTITY(1,1) NOT NULL,
	[State] [nvarchar](20) NOT NULL,
	[StateClass] [nvarchar](20) NULL,
	[ActionCssClass] [nvarchar](20) NULL,
	[TaskName] [nvarchar](50) NULL,
	[AddedOn] [date] NULL,
	[AddedBy] [nvarchar](50) NULL,
	[IsBlog] [bit] NOT NULL,
	[ActionIcon] [nvarchar](20) NULL,
	[StateFor] [int] NULL,
	[IsActivityMessage] [bit] NULL,
	[IsStateUpdateOnly] [bit] NULL,
	[IsManageVersion] [bit] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_State] PRIMARY KEY CLUSTERED 
(
	[StateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Subscribe]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Subscribe](
	[SubscribeUserID] [int] IDENTITY(1,1) NOT NULL,
	[UserEmail] [nvarchar](250) NULL,
	[IpAddress] [nvarchar](500) NULL,
	[AddedOn] [date] NULL,
	[SiteID] [int] NULL,
	[IsActive] [bit] NULL,
	[SubscribeID] [uniqueidentifier] NULL,
	[PageName] [nvarchar](50) NULL,
 CONSTRAINT [PK_Article_Subscribe] PRIMARY KEY CLUSTERED 
(
	[SubscribeUserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Subscribe_CatMap]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Subscribe_CatMap](
	[ArtSubsMapID] [int] IDENTITY(1,1) NOT NULL,
	[SubscribeUserID] [int] NOT NULL,
	[CategoryID] [int] NOT NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Subscribe_CatMap] PRIMARY KEY CLUSTERED 
(
	[ArtSubsMapID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Tag]    Script Date: 1/22/2018 4:51:40 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Tag](
	[ArticleTagID] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [nvarchar](100) NULL,
	[IsActive] [bit] NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[UpdatedOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](256) NULL,
	[DeletedOn] [datetime] NULL,
	[DeletedBy] [nvarchar](256) NULL,
	[IsBlog] [bit] NOT NULL,
	[SiteID] [int] NULL
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_TagMapping]    Script Date: 1/22/2018 4:51:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_TagMapping](
	[TagMappingID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleID] [int] NOT NULL,
	[ArticleTagID] [int] NOT NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_TagMapping] PRIMARY KEY CLUSTERED 
(
	[TagMappingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Template]    Script Date: 1/22/2018 4:51:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Template](
	[TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](250) NULL,
	[CategoryID] [int] NULL,
	[TemplateEditDOM] [nvarchar](max) NULL,
	[TemplateViewDom] [nvarchar](max) NULL,
	[DataReplaceFrameDom] [nvarchar](max) NULL,
	[AddedBy] [nvarchar](50) NULL,
	[AddedOn] [datetime] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedOn] [datetime] NULL,
	[IsBlog] [bit] NOT NULL,
	[IsSummary] [bit] NOT NULL,
	[IsDeleted] [bit] NULL,
	[IsSystemDefined] [bit] NULL,
	[LayoutType] [nvarchar](20) NULL,
	[IsDefault] [bit] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Template] PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_TypeArticleMapping]    Script Date: 1/22/2018 4:51:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_TypeArticleMapping](
	[ArticleTypeMapping] [bigint] IDENTITY(1,1) NOT NULL,
	[ArticleID] [bigint] NULL,
	[ArticleTypeID] [int] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_TypeArticleMapping] PRIMARY KEY CLUSTERED 
(
	[ArticleTypeMapping] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_Types]    Script Date: 1/22/2018 4:51:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_Types](
	[ArticleTypeID] [int] IDENTITY(1,1) NOT NULL,
	[ArticleTypes] [nvarchar](250) NULL,
	[AddedOn] [date] NULL,
	[AddedBy] [nvarchar](250) NULL,
	[IsBlog] [bit] NULL,
	[SiteID] [int] NULL,
 CONSTRAINT [PK_Article_Types] PRIMARY KEY CLUSTERED 
(
	[ArticleTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

/****** Object:  Table [dbo].[Article_VersionLog]    Script Date: 1/22/2018 4:51:41 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Article_VersionLog](
	[LogID] [int] IDENTITY(1,1) NOT NULL,
	[Message] [nvarchar](256) NULL,
	[LogFrom] [nvarchar](256) NULL,
	[LogTo] [nvarchar](256) NULL,
	[StateID] [int] NOT NULL,
	[DetailsArticle] [nvarchar](max) NULL,
	[Title] [nvarchar](256) NULL,
	[Summary] [nvarchar](256) NULL,
	[IsBlog] [bit] NOT NULL,
	[ArticleID] [int] NOT NULL,
	[DetailsEditDOM] [nvarchar](max) NULL,
	[AddedOn] [datetime] NULL,
	[AddedBy] [nvarchar](256) NULL,
	[SiteID] [int] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO

ALTER TABLE [dbo].[Article] ADD  CONSTRAINT [DF_Article_AddedOn]  DEFAULT (getutcdate()) FOR [AddedOn]
GO

ALTER TABLE [dbo].[Article] ADD  CONSTRAINT [DF_Article_UpdatdOn]  DEFAULT (getutcdate()) FOR [UpdatdOn]
GO

ALTER TABLE [dbo].[Article] ADD  CONSTRAINT [DF_Article_IsCustomReport]  DEFAULT ((0)) FOR [IsCustomReport]
GO

ALTER TABLE [dbo].[Article_Advertisment] ADD  CONSTRAINT [DF__Article_A__IsDel__60D24498]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Article_Advs_Brand] ADD  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Article_Category] ADD  CONSTRAINT [DF_Article_Category_AddedOn]  DEFAULT (getutcdate()) FOR [AddedOn]
GO

ALTER TABLE [dbo].[Article_Category] ADD  CONSTRAINT [DF_Article_Category_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Article_Comment] ADD  CONSTRAINT [DF_ArticleComment_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Article_Comment] ADD  CONSTRAINT [DF_ArticleComment_IsApproved]  DEFAULT ((0)) FOR [IsApproved]
GO

ALTER TABLE [dbo].[Article_EntryFormType] ADD  CONSTRAINT [DF_Article_EntryFormType_SiteID]  DEFAULT ((0)) FOR [SiteID]
GO

ALTER TABLE [dbo].[Article_Media] ADD  CONSTRAINT [DF_ArticleImage_AddedOn]  DEFAULT (getutcdate()) FOR [AddedOn]
GO

ALTER TABLE [dbo].[Article_Media] ADD  CONSTRAINT [DF_ArticleImage_UpdatedOn]  DEFAULT (getutcdate()) FOR [UpdatedOn]
GO

ALTER TABLE [dbo].[Article_RecycleBin] ADD  CONSTRAINT [DF_Article_RecycleBin_AddedOn]  DEFAULT (getutcdate()) FOR [AddedOn]
GO

ALTER TABLE [dbo].[Article_RecycleBin] ADD  CONSTRAINT [DF_Article_RecycleBin_UpdatdOn]  DEFAULT (getutcdate()) FOR [UpdatdOn]
GO

ALTER TABLE [dbo].[Article_RecycleBin] ADD  CONSTRAINT [DF_Article_RecycleBin_IsCustomReport]  DEFAULT ((0)) FOR [IsCustomReport]
GO

ALTER TABLE [dbo].[Article_Setting] ADD  CONSTRAINT [DF_ArticleSetting_IsDeleted_1]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Article_Setting] ADD  CONSTRAINT [DF_ArticleSetting_IsModified_1]  DEFAULT ((0)) FOR [IsModified]
GO

ALTER TABLE [dbo].[Article_Setting] ADD  CONSTRAINT [DF_ArticleSetting_AddedOn_1]  DEFAULT (getdate()) FOR [AddedOn]
GO

ALTER TABLE [dbo].[Article_Setting] ADD  CONSTRAINT [DF_ArticleSetting_UpdatedOn_1]  DEFAULT (getdate()) FOR [UpdatedOn]
GO

ALTER TABLE [dbo].[Article_State] ADD  CONSTRAINT [DF_Article_State_IsActivityMessage]  DEFAULT ((0)) FOR [IsActivityMessage]
GO

ALTER TABLE [dbo].[Article_State] ADD  CONSTRAINT [DF_Article_State_IsStateUpdateOnly]  DEFAULT ((0)) FOR [IsStateUpdateOnly]
GO

ALTER TABLE [dbo].[Article_State] ADD  CONSTRAINT [DF_Article_State_IsManageVersion]  DEFAULT ((0)) FOR [IsManageVersion]
GO

ALTER TABLE [dbo].[Article_State] ADD  CONSTRAINT [DF_Article_State_SiteID]  DEFAULT ((0)) FOR [SiteID]
GO

ALTER TABLE [dbo].[Article_Subscribe] ADD  CONSTRAINT [DF_Article_Subscribe_SiteID]  DEFAULT ((0)) FOR [SiteID]
GO

ALTER TABLE [dbo].[Article_Subscribe_CatMap] ADD  CONSTRAINT [DF_Article_Subscribe_CatMap_SiteID]  DEFAULT ((0)) FOR [SiteID]
GO

ALTER TABLE [dbo].[Article_Tag] ADD  CONSTRAINT [DF_ArticleTag_IsActive]  DEFAULT ((1)) FOR [IsActive]
GO

ALTER TABLE [dbo].[Article_Tag] ADD  CONSTRAINT [DF_ArticleTag_AddedOn]  DEFAULT (getutcdate()) FOR [AddedOn]
GO

ALTER TABLE [dbo].[Article_TagMapping] ADD  CONSTRAINT [DF_Article_TagMapping_SiteID]  DEFAULT ((0)) FOR [SiteID]
GO

ALTER TABLE [dbo].[Article_Template] ADD  CONSTRAINT [DF_Article_Template_IsSummary]  DEFAULT ((0)) FOR [IsSummary]
GO

ALTER TABLE [dbo].[Article_Template] ADD  CONSTRAINT [DF_Article_Template_IsDeleted]  DEFAULT ((0)) FOR [IsDeleted]
GO

ALTER TABLE [dbo].[Article_Template] ADD  CONSTRAINT [DF_Article_Template_CanChange]  DEFAULT ((0)) FOR [IsSystemDefined]
GO

ALTER TABLE [dbo].[Article_Template] ADD  CONSTRAINT [DF_Article_Template_IsDefault]  DEFAULT ((0)) FOR [IsDefault]
GO




/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_Advs_GetAllFilterValue]    Script Date: 1/22/2018 4:52:36 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		rudra chamlagain
-- Create date:2017/12/18
-- Description: To get Advertisment filter for editing news 
-- exec [usp_Article_Admin_Advs_GetAllFilterValue] 0
CREATE PROCEDURE [dbo].[usp_Article_Admin_Advs_GetAllFilterValue]
	-- Add the parameters for the stored procedure here
@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
SELECT 
       [BrandID]
      ,[Name]
      ,[IconImage]
  FROM [dbo].[Article_Advs_Brand]
  WHERE [IsDeleted]=0 AND [SiteID]=@SiteID
  SELECT
       [SizeID]
      ,[Size]
  FROM [dbo].[Article_Advs_Sizes]
  WHERE  [SiteID]=@SiteID
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_Advs_GetAllNotExpiredAdvs]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		rudra chamlagain
-- Create date:2017/12/15
-- Description: To get Advertisment for editing news 
-- exec [dbo].[usp_Article_Admin_Advs_GetAllNotExpiredAdvs] 0,10,0,0,0,''
CREATE PROCEDURE [dbo].[usp_Article_Admin_Advs_GetAllNotExpiredAdvs]
	-- Add the parameters for the stored procedure here
@Offset int,
@Limit	int,
@BrandID int,
@SiteID int,
@SizeID int,
@CategoryID nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT   
	   A.[AdvsID]
      ,S.[Size]
	  ,S.SizeID
      ,[DefaultFileName]
	  ,[MobileFileName]
      ,[DetailLink]
      ,[Remarks] 
	  ,[IsNoExpire]  
	  ,ISNULL(convert(varchar, [EndDate], 101),'') as EndDate
	  ,ADVC.CategoryID
  into #TempAdv1
  FROM [Article_Advertisment] A
  INNER JOIN Article_Advs_Sizes S
  ON S.SizeID=A.Size
 LEFT JOIN [dbo].[Article_advs_ArticleCategoryMap] AC
			ON  A.AdvsID=AC.AdvsID
  LEFT JOIN [dbo].[Article_advs_ArticleCategoryMap] ADVC
  ON A.AdvsID =ADVC.AdvsID
  WHERE 
  A.SiteID=@SiteID
  AND
  (IsNoExpire=1 OR EndDate>GETDATE())
  AND
  (@BrandID=0 OR [BrandID]=@BrandID)
  AND
  (@CategoryID='' OR AC.CategoryID IN( SELECT * FROM dbo.Split(@CategoryID , ',')))
  AND
  (@SizeID=0 OR A.Size=@SizeID)
 
   SELECT DISTINCT
      [AdvsID]
     ,[Size]
     ,[DefaultFileName]
	 ,[MobileFileName]
      ,[DetailLink]
      ,[Remarks] 
	 , [IsNoExpire]  
	  ,[EndDate]
	  ,SizeID
       ,STUFF(( SELECT DISTINCT
                                ',' +CAST(T.CategoryID AS NVARCHAR(10))
                        FROM    #TempAdv1 AS T
                        WHERE   T.AdvsID = T2.AdvsID
                        GROUP BY T.AdvsID,
                                T.CategoryID
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryIDs 
   INTO 
   #TempAdv
   FROM #TempAdv1 AS T2

   SELECT  * ,COUNT( AdvsID) OVER()  AS RowTotal from #TempAdv
    ORDER BY AdvsID
  OFFSET(@Offset) ROWS
  FETCH NEXT @Limit ROWS ONLY
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_DeleteByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- -----------------------------------------------
-- Author:	Rudra chamlagain
-- Create date: <2017-Nov-15>
-- Description: GET ARTICLE AND OTHER PARAM BY ID
-- EXEC [usp_Article_Admin_DeleteByID] 48
-----------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_Admin_DeleteByID] 
@ArticleID int,
@OpStat int out,
@RoleID nvarchar(MAX)
AS
BEGIN
DECLARE @IsAdmin bit=0; 
DECLARE @TempRole TABLE(RoleID NVARCHAR(250))
INSERT INTO @TempRole SELECT * FROM [dbo].[Split](@RoleID,'')
IF EXISTS(SELECT 1 FROM @TempRole WHERE @RoleID='910F0C31-E1DD-42D2-988B-545FE8621544' OR @RoleID='228F0AD3-76B3-4585-A008-091AE667AD57')
SET @IsAdmin=1
INSERT INTO 
[dbo].[Article_RecycleBin]
(      [Title]
      ,[Summary]
      ,[Detail]
      ,[NewsSource]
      ,[Quotation]
      ,[StateID]
      ,[ArticleEntryType]
      ,[PublishDate]
      ,[OpinionBy]
      ,[Location]
      ,[DetailsEditDOM]
      ,[DetailsViewDOM]
      ,[AssignTo]
      ,[IsBlog]
      ,[CultureCode]
      ,[AddedBy]
      ,[AddedOn]
      ,[UpdatdOn]
      ,[UpdatedBy]
      ,[IsCustomReport]
      ,[CustomReport]
      ,[SiteID])
SELECT
       [Title]
      ,[Summary]
      ,[Detail]
      ,[NewsSource]
      ,[Quotation]
      ,[StateID]
      ,[ArticleEntryType]
      ,[PublishDate]
      ,[OpinionBy]
      ,[Location]
      ,[DetailsEditDOM]
      ,[DetailsViewDOM]
      ,[AssignTo]
      ,[IsBlog]
      ,[CultureCode]
      ,[AddedBy]
      ,[AddedOn]
      ,[UpdatdOn]
      ,[UpdatedBy]
      ,[IsCustomReport]
      ,[CustomReport]
      ,[SiteID]
 FROM [dbo].[Article]  
 WHERE [ArticleID]=@ArticleID AND (@IsAdmin=1  OR StateID=11)
 DELETE FROM [dbo].[Article]  
 WHERE [ArticleID]=@ArticleID AND (@IsAdmin=1  OR StateID=11)
 IF @@ROWCOUNT>0
  set @OpStat=1
 ELSE 
    set @OpStat=2
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_GetAllArticle]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Rudra
-- Create date: <2017-Nov-23>
-- Description:	
-- EXEC [dbo].[usp_Article_Admin_GetAllArticle] 0,20,'rudra','521832A1-52F1-432C-8CF1-0CAEDEFC6BA5','','','','','','','0','','',2,0,0
-- =============================================
CREATE PROCEDURE [dbo].[usp_Article_Admin_GetAllArticle]
 @OffSet INT, 
 @Limit INT,
 @UserName nvarchar(250),
 @RoleID NVARCHAR(250),
 @Keywords nvarchar(250),
 @CategoryIDs nvarchar(max),
 @ArticleTypeIDs nvarchar(max),
 @Location NVARCHAR(50),
 @Reporter NVARCHAR(250),
 @Editor NVARCHAR(50),
 @StateIDs INT,
 @DateFrom NVARCHAR(20),
 @DateTo   NVARCHAR(20),
 @ArticleFor int,
 @IsBlog   BIT
,@SiteID int
AS
 BEGIN
   DECLARE @CatXML xml=cast(@CategoryIDs as xml)
   DECLARE @TypesXML xml=cast(@ArticleTypeIDs as xml)
   DECLARE @AllowState Table(
     stateID INT
   );
    INSERT INTO @AllowState
    SELECT DISTINCT
	StateID 
	FROM   [AdminCommon_Workflow] 
	UNPIVOT
	(StateID FOR I IN ( InputState, OutputState) ) unpiv
	 WHERE RoleID=@RoleID OR @ArticleFor=2
	SET NOCOUNT ON; 
        SELECT  
		        A.ArticleID ,
                AC.CategoryName ,
                A.Title ,
				A.IsCustomReport,
				A.CustomReport,
                A.Location,
                A.UpdatdOn,
				a.AddedOn,
                A.StateID,
                AST.[State],  
				AST.[StateClass],                           
                AT.[ArticleTypes],  
				AAM.UserID,
				AU.FirstName +'#'+AU.LastName AS Author
			   INTO #temp	
        FROM    dbo.Article AS A
		INNER JOIN @AllowState TsT
		ON TsT.stateID=A.StateID
        LEFT JOIN dbo.Article_CategoryMapping AS ACM
                ON ACM.ArticleID = A.ArticleID
        LEFT JOIN dbo.Article_Category AS AC
                ON AC.CategoryID = ACM.CategoryID
        LEFT JOIN dbo.Article_AuthorMapping AS AAM
                ON AAM.ArticleID = A.ArticleID
	    LEFT JOIN aspnet_Users AU
		        ON AU.UserID=AAM.UserID
        LEFT JOIN dbo.Article_State AS AST
                ON A.StateID = AST.StateID     
	    LEFT JOIN  [dbo].[Article_TypeArticleMapping] ATM
		        ON A.ArticleID=ATM.ArticleID
        LEFT JOIN  [dbo].[Article_Types] AT
		        ON ATM.ArticleTypeID=AT.ArticleTypeID
		
         WHERE 
		   (A.IsBlog=@IsBlog)
		    AND
			(A.SiteID=@SiteID)
			AND
		    (@ArticleFor=0 OR @ArticleFor=2 OR(a.StateID=1 AND A.AddedBy=@UserName) OR (A.StateID!=1 AND A.AssignTo=@UserName)) -- IF EDITOR GET ONLY ASIGN NEWS TO EDITOR
		   AND
			(@StateIDS=0 OR A.StateID=@StateIDs)
			AND
			(@DateFrom='' OR A.AddedOn>=@DateFrom)
			 AND
			(@DateTo='' OR A.AddedOn<=@DateTo)
			AND
			(@Keywords='' OR A.Title LIKE '%'+@Keywords+'%')
			AND (@Location='' OR A.Location=@Location)
			AND (@Reporter='' OR AU.UserID LIKE @Reporter)
			AND (@Editor='' OR AU.UserID LIKE @Editor)
			AND(
			@CategoryIDs='' 
			OR 
			ACM.CategoryID 
				IN(
				  SELECT
				  N.value('(./text())[1]', 'int') AS CatID   
				  FROM @CatXML.nodes('/category/catid') AS T(N)
				)
			)
			AND
			(@ArticleTypeIDs='' 
			 OR 
			 AT.ArticleTypeID 
			 IN (
				 SELECT
				 N.value('(./text())[1]', 'int') as TypID    
				 FROM @TypesXML.nodes('/types/typid') AS T(N)
				)
			  )

    
		
			 SELECT
             DISTINCT     
			    --ROW_NUMBER() OVER(ORDER BY t2.ArticleID DESC) AS RowNum,
                COUNT(T2.ArticleID ) OVER()  AS TotalRow,
                T2.ArticleID,
				T2.Title,
                T2.[State],
				T2.[StateClass],
                T2.StateID,                                   
                T2.AddedOn ,
				T2.UpdatdOn,
				IsCustomReport,
				CustomReport,
                STUFF(( SELECT DISTINCT
                                ', ' + T.CategoryName
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID,
                                T.CategoryName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryName ,
                STUFF(( SELECT DISTINCT
                                ', ' + T.Author
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.UserID,
								T.Author
                        FOR
                        XML PATH('')
                      ), 1, 1, '') AS Author,
                   STUFF(( SELECT DISTINCT
                                ', ' + T.ArticleTypes
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY   T.ArticleID,
						           T.ArticleTypes
                        FOR
                        XML PATH('')
                      ), 1, 1, '') AS ArticleTypes 
                
        FROM    #temp AS T2		
        GROUP BY 
		        T2.ArticleID,
				T2.Title,
                T2.[State],
                T2.StateID,                                   
                T2.AddedOn,
				T2.UpdatdOn,
				IsCustomReport,
				CustomReport,
				t2.StateClass
        ORDER BY T2.UpdatdOn DESC 
                OFFSET @OffSet ROWS
		FETCH NEXT @Limit ROWS ONLY;
        DROP TABLE #temp;
   
    END;

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_GetByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- -----------------------------------------------
-- Author:	Rudra chamlagain
-- Create date: <2017-Nov-15>
-- Description: GET ARTICLE AND OTHER PARAM BY ID
-- EXEC [usp_Article_Admin_GetByID] 48
-----------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_Admin_GetByID] 
@ArticleID int
AS
    BEGIN
    SET NOCOUNT ON; 
	SELECT 
	   [ArticleID]
      ,[Title]
      ,[Summary]
      ,[Detail]
      ,[NewsSource]
      ,[Quotation]
      ,[StateID]
      ,[ArticleEntryType]
      ,[PublishDate]
      ,[OpinionBy]
      ,[Location]
      ,[DetailsEditDOM]
      ,[DetailsViewDOM]
      ,[AssignTo] 
	  ,[CustomReport]
	  ,[IsCustomReport] 
      ,[AddedBy]
      ,[AddedOn]
      ,[UpdatdOn]
      ,[UpdatedBy]   
       FROM [dbo].[Article]
	   WHERE ArticleID=@ArticleID
	
		SELECT am.MediaID,AM.IsForSummary, AM.[Source],AM.[Description],AM.MediaTitle,AM.MediaType,AM.[FileName]
		FROM dbo.Article_Media AS AM WHERE AM.ArticleID=@ArticleID
		
		SELECT ACM.CategoryID,AC.CategoryName from Article_CategoryMapping ACM 
		INNER JOIN Article_Category AC
		on ACM.CategoryID=AC.CategoryID	
		where ACM.ArticleID=@ArticleID

		SELECT (AU.FirstName+'#'+Au.LastName) As Author,
		        AU.[image],
				AU.Username AS UserName

		FROM 
		Article_AuthorMapping AAM
		Inner JOIN aspnet_Users AU 
		ON AU.UserID=AAM.UserID
		WHERE AAM.ArticleID=@ArticleID
		
		SELECT AT.ArticleTypeID,ArticleTypes FROM
		[dbo].[Article_Types] AT
		INNER JOIN 
        [dbo].[Article_TypeArticleMapping] ATM
		ON ATM.ArticleTypeID=AT.ArticleTypeID
		 WHERE ATM.ArticleID=@ArticleID

	   SELECT 
       [LinkURL]
      ,[LinkType]
      ,[MediaType]
       FROM [dbo].[Article_ExternalLinks]
	   WHERE ArticleID=@ArticleID
    END;
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_GetViewByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- -----------------------------------------------
-- Author:	Rudra chamlagain
-- Create date: <2017-dec-14>
-- Description: GET ARTICLE AND OTHER PARAM BY ID
-- EXEC [usp_Article_Admin_GetByID] 37
-----------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_Admin_GetViewByID] 
@ArticleID int
AS
    BEGIN
    SET NOCOUNT ON; 
	SELECT 
	   [ArticleID]
      ,[Title]
      ,[Summary]    
      ,[StateID]
      ,[ArticleEntryType]
      ,[PublishDate]
      ,[OpinionBy]
      ,[Location]
      ,[DetailsViewDOM]
       FROM [dbo].[Article]
	   WHERE ArticleID=@ArticleID	
    END;
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Admin_UpdateArticleState]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- -----------------------------------------------
-- Author:	Rudra chamlagain
-- Create date: <2017-dec-14>
-- Description: GET ARTICLE AND OTHER PARAM BY ID
-- EXEC [usp_Article_Admin_UpdateArticleState] 37
-----------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_Admin_UpdateArticleState] 
@ArticleID int,
@StateID int,
@RoleID nvarchar(250),
@Message nvarchar(250),
@AddedBy nvarchar(250),
@OpStatus int out
AS
BEGIN

DECLARE 
@IsVersion BIT,
@IsStateOnlyUpdate BIT,
@TaskName NVARCHAR(250),
@PrevState int

  SET NOCOUNT ON; 
	   SELECT @PrevState=StateID FROM Article WHERE ArticleID=@ArticleID
   IF EXISTS(SELECT 1 FROM AdminCommon_Workflow WHERE InputState=@PrevState AND OutputState=@StateID AND RoleID=@RoleID) -- CHECK PERMISSION FOR CURRENT STATE IS ALLOW OR NOT
   BEGIN
      SELECT @IsVersion=[IsManageVersion],@IsStateOnlyUpdate=[IsStateUpdateOnly],@TaskName=[TaskName] From [dbo].[Article_State] where StateID=@StateID
	    IF @IsVersion=1
		BEGIN
		INSERT INTO [dbo].[Article_VersionLog]
				   ([Message]
				   ,[LogFrom]
				   ,[LogTo]
				   ,[StateID]
				   ,[DetailsArticle]
				   ,[Title]
				   ,[Summary]
				   ,[IsBlog]
				   ,[ArticleID]
				   ,[DetailsEditDOM]
				   ,[AddedOn]
				   ,[AddedBy])
			 SELECT  @Message,@AddedBy,AddedBy,StateID,Detail,Title,Summary,IsBlog,ArticleID,DetailsEditDOM,GETDATE(),@AddedBy FROM [dbo].[Article] WHERE [ArticleID]=@ArticleID
	    END
     	BEGIN
		UPDATE [dbo].[Article] SET 	
			[StateID]=@StateID,
			[UpdatdOn]=GETDATE(),
			PublishDate=GETDATE(),
			[UpdatedBy]=@AddedBy
			WHERE [ArticleID]=@ArticleID
		END
		IF @Message=''
	          SET @Message= @TaskName
	  -- ACTIVITY LOG MESSAGE 
		INSERT INTO [dbo].[Article_ActivityLog]
				   ([ArticleID]
				   ,[ActivityDate]
				   ,[Message]
				   ,[StateID]
				   ,[AddedBy])
		 VALUES
				   (@ArticleID,GETDATE(),@Message,@StateID,@AddedBy)
	   set @OpStatus=2
	END
   ELSE 
   BEGIN
   SET @OpStatus=-1
   END
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Advertisement_AddAdvertisement]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[usp_Article_Advertisement_AddAdvertisement]
(
@AdvsID int,
@BrandID int,
@Size nvarchar(100),
@MobSize nvarchar(100),
@DefaultFileName nvarchar(50),
@MobileFileName nvarchar(50),
@StartDate date,
@EndDate date,
@IsNoExpire bit,
@DetailLink nvarchar(250),
@Remarks nvarchar(50),
@AddedBy nvarchar(50),
@CatergoryIDs nvarchar(256),
@SiteID int,
@status INT OUT
)
as
BEGIN

DECLARE 
@EndDates date,
@IntLocation int,
@CategoryID int,
@UserID uniqueidentifier

IF @IsNoExpire=0
BEGIN
set @EndDates = @EndDate;
END

ELSE
BEGIN
set @EndDates = NULL;
END

IF @AdvsID=0
BEGIN
	INSERT INTO [dbo].[Article_Advertisment]([BrandID], [Size],[MobileSize],[DefaultFileName],[MobileFileName],[StartDate],[EndDate],[IsNoExpire],[DetailLink],[Remarks],[AddedOn],[AddedBy],[SiteID])
		 VALUES
	(@BrandID,@Size,@MobSize,@DefaultFileName,@MobileFileName,@StartDate,@EndDates,@IsNoExpire,@DetailLink,@Remarks,GETDATE(),@AddedBy,@SiteID)
		SET @status = 0;
		
		SET @AdvsID=SCOPE_IDENTITY()

		WHILE (CHARINDEX(',',    @CatergoryIDs, 1) > 0)
        BEGIN
              SET @IntLocation =   CHARINDEX(',',    @CatergoryIDs, 0)      
              INSERT INTO   Article_advs_ArticleCategoryMap (CategoryID,AdvsID,SiteID)
              --LTRIM and RTRIM to ensure blank spaces are   removed
              SELECT RTRIM(LTRIM(SUBSTRING(@CatergoryIDs,   0, @IntLocation))),@AdvsID,@SiteID 
              SET @CatergoryIDs = STUFF(@CatergoryIDs,   1, @IntLocation,   '') 
        END

	END
 ELSE


BEGIN
	UPDATE [dbo].[Article_Advertisment] SET 	
	[BrandID] = @BrandID,
		[Size] = @Size,	
		[MobileSize] = @MobSize,
		[DefaultFileName] = @DefaultFileName,
		[MobileFileName] = @MobileFileName,		
			[StartDate] = @StartDate,
				[EndDate] = @EndDates,
					[IsNoExpire] = @IsNoExpire,
						[DetailLink] = @DetailLink,
							[Remarks] = @Remarks,		
		[UpdatedOn] = GetDate(),
		[UpdatedBy] = @AddedBy
	WHERE [AdvsID]=@AdvsID AND [SiteID] = @SiteID
		
			create table #temp(AdvsID int,CategoryID int, SiteID int)
		WHILE (CHARINDEX(',',    @CatergoryIDs, 1) > 0)
        BEGIN
              SET @IntLocation =   CHARINDEX(',',    @CatergoryIDs, 0)      
			  SET @CategoryID=RTRIM(LTRIM(SUBSTRING(@CatergoryIDs,   0, @IntLocation)))
			  
			  INSERT INTO #temp (AdvsID,CategoryID,SiteID) values(@AdvsID,@CategoryID,@SiteID)
			  SET @CatergoryIDs = STUFF(@CatergoryIDs,   1, @IntLocation,   '') 
		END 	

			  	MERGE dbo.Article_advs_ArticleCategoryMap AS Target
				USING #temp AS source	
				ON (Target.AdvsID=SOURCE.AdvsID AND Target.CategoryID=source.CategoryID AND Target.SiteID=source.SiteID)			
				WHEN MATCHED --AND Target.CategoryID<>source.CategoryID
				THEN 
				UPDATE SET Target.CategoryID=source.CategoryID
				WHEN NOT MATCHED BY TARGET THEN 
				INSERT (AdvsID,CategoryID,SiteID) VALUES(Source.AdvsID,Source.CategoryID,Source.SiteID)
				WHEN NOT MATCHED BY SOURCE AND Target.AdvsID=@AdvsID THEN
				DELETE
				OUTPUT $action,
				Deleted.CategoryID AS CategoryTarget,
				Deleted.AdvsID AS AdvsTarget,
				Deleted.SiteID AS SiteIDTarget,
				Inserted.AdvsID AS AdvsSource,
				Inserted.CategoryID AS CategorySource,
				Inserted.SiteID AS SiteIDSource;
				SELECT @@ROWCOUNT;             
              
			  drop table #temp	
			  SET @status = 1
END

END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Advertisement_DeleteAdvertisement]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[usp_Article_Advertisement_DeleteAdvertisement]
(
@SiteID int,
@AdvsID int,
@UserName nvarchar(50)
)
AS
BEGIN
DELETE FROM Article_Advertisment WHERE AdvsID = @AdvsID AND SiteID = @SiteID;
DELETE FROM Article_advs_ArticleCategoryMap WHERE AdvsID = @AdvsID AND SiteID = @SiteID;
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Advertisement_GetAllAdDetByAdId]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_Advertisement_GetAllAdDetByAdId] 
@SiteID INT,
@AdID INT
AS
    BEGIN
        SET NOCOUNT ON;
	
        SELECT  AA.AdvsID ,
                AA.BrandID ,
                AAB.Name AS [BrandName] ,
                AA.Size ,
				AA.MobileSize,
                AA.DefaultFileName ,
                AA.MobileFileName ,			
                AA.StartDate ,
                AA.EndDate ,
                AA.IsNoExpire ,
                AA.DetailLink ,
                AA.Remarks ,
                AACM.CategoryID ,
                CategoryName
        INTO    #T
        FROM    Article_Advertisment AA
        LEFT JOIN dbo.Article_Advs_Brand AAB
                ON AA.BrandID = AAB.BrandID
        LEFT JOIN dbo.Article_advs_ArticleCategoryMap AACM
                ON AA.AdvsID = AACM.AdvsID
        LEFT JOIN dbo.Article_Category AC
                ON AACM.CategoryID = AC.CategoryID
        WHERE   AA.IsDeleted = 0
                AND AA.AdvsID = @AdID AND AA.SiteID = @SiteID;

        SELECT	DISTINCT
                AA.AdvsID ,
                AA.BrandID ,
                AA.BrandName ,
                AA.Size ,
				AA.MobileSize,
                AA.DefaultFileName ,
                AA.MobileFileName ,
                AA.StartDate ,
                AA.EndDate ,
                AA.IsNoExpire ,
                AA.DetailLink ,
                AA.Remarks ,
                STUFF(( SELECT  ',' + CONVERT(VARCHAR(500), T.CategoryID)
                        FROM    #T AS T
                        WHERE   T.AdvsID = AA.AdvsID
                        GROUP BY T.AdvsID ,
                                T.CategoryID
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryID ,
                STUFF(( SELECT  ',' + T.CategoryName
                        FROM    #T AS T
                        WHERE   T.AdvsID = AA.AdvsID
                        GROUP BY T.AdvsID ,
                                T.CategoryName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryName
        INTO    #adList
        FROM    #T AS AA;	

	
        SELECT  *
        FROM    #adList;
        DROP TABLE #T,#adList;
    END;


GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Advertisement_GetAllBrands]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_Article_Advertisement_GetAllBrands]
(
@SiteID INT
)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SELECT BrandID, Name from Article_Advs_Brand where IsDeleted = 0 AND SiteID = @SiteID;
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Advertisement_SearchAllAds]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--EXEC [usp_Article_Advertisement_SearchAllAds] 0,0,5,'','<category></category>','','';
CREATE PROCEDURE [dbo].[usp_Article_Advertisement_SearchAllAds]
	(
	@SiteID int,
		@pageNumber int,
	@pageSize int,
	@searchTerm int,
	 @CategoryIDs nvarchar(250),
 @DateFrom NVARCHAR(20),
 @DateTo   NVARCHAR(20)
	)
AS
    BEGIN
        SET NOCOUNT ON;
	DECLARE @totalRowCount int;
	DECLARE @CatXML xml=cast(@CategoryIDs as xml);
	SELECT @totalRowCount = COUNT(*) OVER ( ORDER BY AdvsID ) FROM Article_Advertisment WHERE IsDeleted = 0 AND SiteID = @SiteID;

        SELECT  AA.AdvsID ,
                AAB.Name AS [BrandName] ,
                AAS.Size ,
				AAM.MobileSize,
				AA.DefaultFileName,
                AA.StartDate ,
                AA.EndDate ,
                AA.IsNoExpire ,
                AA.DetailLink ,
                CategoryName
        INTO    #T
        FROM    Article_Advertisment AA
        LEFT JOIN dbo.Article_Advs_Brand AAB
                ON AA.BrandID = AAB.BrandID
        LEFT JOIN dbo.Article_advs_ArticleCategoryMap AACM
                ON AA.AdvsID = AACM.AdvsID
				LEFT JOIN dbo.Article_Advs_Sizes AAS
		ON AA.Size = AAS.SizeID		
		LEFT JOIN dbo.Article_Advs_Sizes AAM
		ON AA.MobileSize = AAM.SizeID	
        LEFT JOIN dbo.Article_Category AC
                ON AACM.CategoryID = AC.CategoryID
        WHERE   AA.IsDeleted = 0 AND AA.SiteID = @SiteID AND
		(@searchTerm=0 OR  AA.BrandID = @searchTerm) AND
		 (@DateFrom='' OR AA.StartDate>=@DateFrom) AND			 
			(@DateTo='' OR AA.StartDate<=@DateTo) 
					AND(
			@CategoryIDs='<category></category>' 
			OR 
			AACM.CategoryID 
				IN(
				  SELECT
				  N.value('(./text())[1]', 'int') AS CatID   
				  FROM @CatXML.nodes('/category/catid') AS T(N)
				)
			)

        SELECT	DISTINCT
                AA.AdvsID ,
                AA.BrandName ,
                 AA.Size,
				AA.MobileSize,
				AA.DefaultFileName,
                AA.StartDate ,
                AA.EndDate ,
                AA.IsNoExpire ,
                AA.DetailLink ,
                STUFF(( SELECT  ', ' + T.CategoryName
                        FROM    #T AS T
                        WHERE   T.AdvsID = AA.AdvsID
                        GROUP BY T.AdvsID ,
                                T.CategoryName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryName
        INTO    #adList
        FROM    #T AS AA;	


        SELECT   COUNT(AdvsID) OVER() AS TotalRow, 
                ROW_NUMBER() OVER ( ORDER BY AdvsID DESC ) AS RowNumber ,
                *
        FROM    #adList ORDER BY AdvsID DESC 
	   OFFSET (@pageNumber) ROWS
		FETCH NEXT @pageSize ROWS ONLY;
        DROP TABLE #T,#adList;
    END;

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Advertisement_Sizes_GetAll]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_Advertisement_Sizes_GetAll]
@SiteID int
	AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

 SELECT [SizeID]
      ,[Size]
      ,[MobileSize]   
  FROM [dbo].[Article_Advs_Sizes];
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_AddUpdateArticleType]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update article type.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_ArticleSetting_AddUpdateArticleType]
@articleTypeID INT,
@articleType NVARCHAR(250),
@addedBy NVARCHAR(250),
@isBlog BIT,
@siteID INT,
@Status INT OUT
AS
BEGIN
	SET NOCOUNT ON;
	IF @articleTypeID = 0
		IF EXISTS (SELECT * FROM Article_Types WHERE ArticleTypes = @articleType AND (SiteID = @siteID OR SiteID = 0))
			BEGIN
				SET @Status = 1
			END
		ELSE
			BEGIN
				INSERT INTO Article_Types (ArticleTypes, AddedOn, AddedBy, IsBlog, SiteID)
				VALUES (@articleType, GETDATE(), @addedBy, @isBlog, @siteID)
				SET @Status = 0
			END
	ELSE
		BEGIN
		IF EXISTS (SELECT ArticleTypeID FROM Article_Types WHERE ArticleTypes = @articleType AND ArticleTypeID <> @articleTypeID AND (SiteID = @siteID OR SiteID = 0))
			BEGIN
				SET @Status = 1
			END
		ELSE
			BEGIN
				UPDATE Article_Types SET
				ArticleTypes = @articleType
				WHERE
				ArticleTypeID = @articleTypeID
				AND SiteID = @siteID
				SET @Status = 2
			END
	END
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_AddUpdateBrand]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update article brand.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_ArticleSetting_AddUpdateBrand]
@brandID INT,
@brandName NVARCHAR(100),
@brandIcon NVARCHAR(50),
@username NVARCHAR(256),
@siteID INT,
@Status INT OUT
AS
BEGIN
	SET NOCOUNT ON;
	IF @brandID = 0
		IF EXISTS (SELECT * FROM Article_Advs_Brand WHERE Name = @brandName AND SiteID = @siteID)
			BEGIN
				SET @Status = 1
			END
		ELSE
			BEGIN
				INSERT INTO Article_Advs_Brand(Name, IconImage, AddedOn, AddedBy, SiteID)
				VALUES (@brandName, @brandIcon, GETDATE(), @username, @siteID)
				SET @Status = 0
			END
	ELSE
		BEGIN
		IF EXISTS (SELECT BrandID FROM Article_Advs_Brand WHERE Name = @brandName AND BrandID <> @brandID AND SiteID= @siteID)
			BEGIN
				SET @Status = 1
			END
		ELSE
			BEGIN
				UPDATE Article_Advs_Brand SET 
				Name = @brandName, 
				IconImage = @brandIcon, 
				UpdatedBy = @username, 
				UpdatedOn = GETDATE()
				WHERE 
				BrandID = @brandID AND SiteID = @siteID
				SET @Status = 2
			END
		END
	RETURN
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_AddUpdateCategory]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update article category.
-- ---------------------------------------------
CREATE PROC [dbo].[usp_Article_ArticleSetting_AddUpdateCategory]
@categoryID INT,
@categoryName NVARCHAR(100),
@icon NVARCHAR(50),
@username NVARCHAR(256),
@isBlog BIT,
@siteID INT,
@status INT OUT
AS
BEGIN
	SET NOCOUNT ON;
	IF @categoryID = 0
		IF EXISTS (SELECT * FROM Article_Category WHERE CategoryName = @categoryName AND SiteID = @siteID)
			BEGIN
				SET @status = 1
			END
		ELSE
			BEGIN
				INSERT INTO Article_Category (CategoryName, Icon, AddedOn, AddedBy, IsBlog, SiteID)
				VALUES (@categoryName, @icon, GETDATE(), @username, @isBlog, @siteID)
				SET @status = 0
			END
	ELSE
		BEGIN
			IF EXISTS (SELECT CategoryID FROM Article_Category WHERE CategoryName = @categoryName AND CategoryID <> @categoryID AND SiteID = @siteID)
				BEGIN
					SET @status = 1
				END
			ELSE
				BEGIN
					UPDATE Article_Category SET CategoryName = @categoryName, Icon = @icon, IsBlog = @isBlog, UpdatedBy = @username, UpdatedOn = GETDATE()
					WHERE CategoryID = @categoryID AND SiteID = @siteID
					SET @status = 2
				END
		END
	RETURN
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_AddUpdateQuickMenu]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update article Article Quick Menu.
-- ---------------------------------------------

CREATE PROCEDURE [dbo].[usp_Article_ArticleSetting_AddUpdateQuickMenu]
(
	@MenuID INT,
	@MenuTitle NVARCHAR(250),
	@MenuUrl NVARCHAR(250),
	@MenuDescripton NVARCHAR(500),
	@IsActive BIT,
	@UserModuleID INT,
	@PortalID INT,
	@CultureCode VARCHAR(20)
)
AS

BEGIN

	SET NOCOUNT ON;    
	IF @MenuID=0
		BEGIN
			INSERT INTO Article_QuickMenu
			(
				MenuTitle
				,MenuUrl
				,MenuDescription
				,IsActive
				,UserModuleID
				,PortalID
				,CultureCode
			)
			VALUES (@MenuTitle, @MenuUrl, @MenuDescripton, @IsActive, @UserModuleID, @PortalID, @CultureCode)
		END
	ELSE
		BEGIN
			UPDATE Article_QuickMenu
			SET MenuTitle = @MenuTitle
			,MenuUrl = @MenuUrl
			,MenuDescription = @MenuDescripton
			,IsActive = @IsActive
			WHERE MenuID = @MenuID
		END
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_AddUpdateSetting]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update article setting.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_ArticleSetting_AddUpdateSetting]
@settingXML NVARCHAR(MAX),
@siteID INT,
@isBlog BIT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @xml XML = CAST(@settingXML AS XML),
	@Count INT,@Counter INT=1,@SettingKey NVARCHAR(50),@SettingValue nvarchar(256)

	DELETE FROM Article_Setting WHERE SiteID = @siteID;
    
	DECLARE @TempSetting TABLE(
	 ID INT IDENTITY(1,1),
	 SettingKey NVARCHAR(50),
	 SettingValue nvarchar(256)
	)

	INSERT INTO @TempSetting
	SELECT
		N.value('(./key/text())[1]', 'nvarchar(50)') as SettingKey
		,N.value('(./value/text())[1]', 'nvarchar(256)') as SettingValue
	
	FROM @xml.nodes('/articleSetting/setting') AS T(N)
	SET @Count=@@ROWCOUNT

   	
	WHILE(@Counter<=@Count)
	BEGIN 
	SELECT 
     @SettingKey=SettingKey 
	 ,@SettingValue=SettingValue
	 FROM @TempSetting
	WHERE ID=@Counter
	-- insert update operation 

	IF EXISTS (SELECT ArticleSettingID FROM Article_Setting WHERE SettingKey = @SettingKey AND SiteID = @siteID)
	BEGIN
		UPDATE Article_Setting SET SettingValue = @SettingValue WHERE SettingKey = @SettingKey AND SiteID = @siteID
	END
	ELSE
	BEGIN
		INSERT INTO Article_Setting (SettingKey, SettingValue, IsDeleted, IsModified, IsBlog, SiteID)
		VALUES (@SettingKey, @SettingValue, 0, 0, @isBlog, @siteID)
	END

	SET @Counter=@Counter+1
	END 


END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_DeleteArticleTypeByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_DeleteArticleTypeByID]
(
	@typeID INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
	IF @siteID > 0
	BEGIN
		DELETE FROM Article_Types WHERE ArticleTypeID = @typeID AND SiteID = @siteID
	END
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_DeleteBrandByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_DeleteBrandByID]
(
	@brandID INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM Article_Advs_Brand WHERE BrandID = @brandID AND SiteID = @siteID;
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_DeleteBrandIcon]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_DeleteBrandIcon]
@brandID INT,
@siteID INT
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Article_Advs_Brand SET IconImage = null WHERE BrandID = @brandID AND SiteID = @siteID;
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_DeleteCategory]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Delete category
-- ---------------------------------------------
CREATE PROC [dbo].[usp_Article_ArticleSetting_DeleteCategory]
@categoryID INT,
@siteID INT
AS
BEGIN
	SET NOCOUNT ON;
	DELETE FROM Article_Category WHERE CategoryID = @categoryID AND SiteID = @siteID
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_DeleteCategoryIcon]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Delete category icon path.
-- ---------------------------------------------
CREATE PROC [dbo].[usp_Article_ArticleSetting_DeleteCategoryIcon]
@catID INT,
@siteID INT
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Article_Category SET Icon = NULL WHERE CategoryID = @catID AND SiteID = @siteID;
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_DeleteQuickMenuByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_ArticleSetting_DeleteQuickMenuByID]
@MenuID INT
AS
BEGIN
	SET NOCOUNT ON;    
	DELETE FROM Article_QuickMenu WHERE MenuID = @MenuID
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetAllArticleType]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_GetAllArticleType]
(
	@pageNumber INT,
	@pageSize INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
		SELECT COUNT(ArticleTypes) OVER() AS RowsCount,
		* FROM Article_Types 
		WHERE SiteID = @siteID OR SiteID = 0
		ORDER BY ArticleTypeID
		OFFSET (@pageNumber) ROWS
		FETCH NEXT @pageSize ROWS ONLY
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetAllBrand]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_GetAllBrand]
(
	@pageNumber INT,
	@pageSize INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
		SELECT 
		COUNT(Name) OVER() AS RowsCount, 
		* FROM Article_Advs_Brand 
		WHERE SiteID = @siteID
		ORDER BY Name
		OFFSET (@pageNumber) ROWS
		FETCH NEXT @pageSize ROWS ONLY
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetAllCategory]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ------------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/14/2017 12:09:36 PM
-- Description:	To get all category
-- ------------------------------------------------
CREATE PROC [dbo].[usp_Article_ArticleSetting_GetAllCategory]
(
	@pageNumber INT,
	@pageSize INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
		SELECT 
		COUNT (CategoryName) OVER() RowsCount, 
		* FROM Article_Category
		WHERE SiteID = @siteID
		ORDER BY CategoryName
		OFFSET (@pageNumber) ROWS
		FETCH NEXT @pageSize ROWS ONLY
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetAllQuickMenu]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Get all the menu items for article setting link.
-- ---------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_ArticleSetting_GetAllQuickMenu]
	@PortalID INT,
	@CultureCode VARCHAR(20)
AS
BEGIN
	
	SET NOCOUNT ON;    
	SELECT
	MenuID,
	MenuTitle,
	MenuUrl,
	MenuDescription,
	IsActive
	FROM Article_QuickMenu
	WHERE 
	PortalID=@PortalID AND CultureCode=@CultureCode AND IsActive = 1
 END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetArticleTypeByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_GetArticleTypeByID]
(
	@typeID INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM Article_Types WHERE ArticleTypeID = @typeID AND SiteID = @siteID
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetBrandByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_ArticleSetting_GetBrandByID]
(
	@brandID INT,
	@siteID INT
)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM Article_Advs_Brand WHERE BrandID = @brandID AND SiteID = @siteID;
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetCategoryByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Get category by category ID.
-- ---------------------------------------------
CREATE PROC [dbo].[usp_Article_ArticleSetting_GetCategoryByID]
(
	@categoryID INT,
	@siteID INT
)
AS
BEGIN
SET NOCOUNT ON;
	SELECT * FROM Article_Category WHERE CategoryID = @categoryID AND SiteID = @siteID;
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetQuickMenuByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_ArticleSetting_GetQuickMenuByID]
@MenuID INT
AS
BEGIN
	SET NOCOUNT ON;    
	SELECT
	MenuID,
	MenuTitle,
	MenuUrl,
	MenuDescription,
	IsActive
	FROM Article_QuickMenu WHERE MenuID = @MenuID
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_ArticleSetting_GetSetting]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Get all article settings by site id.
-- ---------------------------------------------
-- EXEC [dbo].[usp_Article_ArticleSetting_GetSetting] 0
CREATE PROC [dbo].[usp_Article_ArticleSetting_GetSetting] 
	@siteID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @PageName nvarchar(250)
	SELECT @PageName=PageName FROM Pages PP
	INNER JOIN Article_Setting  ARS
	on PP.PageID=ARS.SettingValue
	WHERE 
	ARS.SettingKey='detailPageSetting'
	AND  SiteID = @siteID;

	SELECT SettingKey, SettingValue,ISNULL(@PageName,'') as PageName
	FROM
	Article_Setting  
	WHERE SiteID = @siteID;
	
	

END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Editor_AddUpdateNews]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:	RUDRA CHAMLAGAIN
-- Create date: 2017/12/4
-- Description:	To add update article by editor
-- 
CREATE Procedure [dbo].[usp_Article_Editor_AddUpdateNews]
@ArticleID int,
@Title nvarchar(250),
@Summary nvarchar(500),
@SummaryDefaultImgID INT,
@ArticleImages nvarchar(250),
@DetailsEditDOM NVARCHAR(MAX),
@DetailsViewDOM NVARCHAR(MAX),
@StateID int,
@IsBlog bit,
@CultureCode nvarchar(20),
@AddedBy nvarchar(256),
@Message nvarchar(250),
@ArticleTypsIDs nvarchar(250),
@Categories nvarchar(250),
@RoleID nvarchar(max),
@SiteID int,
@OpStatus int out
as
BEGIN

DECLARE 
@CharIndex INT,
@IsVersion BIT,
@IsStateOnlyUpdate BIT,
@TaskName NVARCHAR(250),
@PrevState int,
@IsAdmin BIT=0

DECLARE @TempRole table(RoleID nvarchar(250))
INSERT INTO @TempRole SELECT * FROM DBO.Split(@RoleID,',')
IF EXISTS(SELECT RoleID FROM @TempRole WHERE RoleID='910F0C31-E1DD-42D2-988B-545FE8621544' OR RoleID='228F0AD3-76B3-4585-A008-091AE667AD57')
BEGIN
  SET @IsAdmin=1
END
IF @ArticleID=0
BEGIN
	INSERT INTO [dbo].[Article]
	([Title],
	[Summary],
	[Detail],
	[NewsSource],
	[ArticleEntryType],
	[StateID],
	[IsBlog],
	[CultureCode],
	[AddedBy],
	[AddedOn],
	[DetailsEditDOM],
	[DetailsViewDOM],
	[AssignTo],
	[SiteID],
	[UpdatdOn],
	[PublishDate]
	)
	 VALUES
	(@Title,@Summary,'','',1,@StateID,@IsBlog,@CultureCode,@AddedBy,GETDATE(),@DetailsEditDOM,@DetailsViewDOM,@AddedBy,@SiteID,GETDATE(),GETDATE())
				
		SET @ArticleID=SCOPE_IDENTITY()

		--SAVE ArticleID  in Comma seperator  Article_TypeArticleMapping
	     INSERT INTO  [dbo].[Article_TypeArticleMapping] ([ArticleID],[ArticleTypeID],[SiteID])
		 select @ArticleID,*,@SiteID from [dbo].[Split](@ArticleTypsIDs,',')
		
		 INSERT INTO [dbo].[Article_CategoryMapping]  ([ArticleID],[CategoryID],[SiteID])
		 select @ArticleID,*,@SiteID from [dbo].[Split](@Categories,',')

		
		-- Save Article Author Mapping 

		INSERT INTO [dbo].[Article_AuthorMapping]
		(UserID,ArticleID,SiteID)
		SELECT USERID,@ArticleID,@SiteID FROM 
		aspnet_Users WHERE Username=@AddedBy
				

		IF @ArticleImages!=''
		BEGIN
		INSERT INTO [dbo].[Article_Media]
           ([ArticleID]
           ,[MediaType]
           ,[MediaTitle]
           ,[FileName]
           ,[Source]
           ,[Description]
           ,[AddedOn]
           ,[AddedBy]     
           ,[IsBlog]
           ,[IsActive]
           ,[IsForSummary]
           ,[SiteID])
          VALUES
           (@ArticleID,'IMAGE','',@ArticleImages,'','',GETDATE(),@AddedBy,@IsBlog,1,1,@SiteID)
		END

		
		set @OpStatus=1	
END
 ELSE
 BEGIN
   SELECT @PrevState=StateID FROM Article WHERE ArticleID=@ArticleID
   IF EXISTS(SELECT 1 FROM AdminCommon_Workflow WHERE InputState=@PrevState AND OutputState=@StateID AND RoleID=@RoleID) OR @IsAdmin=1 -- CHECK PERMISSION FOR CURRENT STATE IS ALLOW OR NOT
   BEGIN
      SELECT @IsVersion=[IsManageVersion],@IsStateOnlyUpdate=[IsStateUpdateOnly],@TaskName=[TaskName] From [dbo].[Article_State] where StateID=@StateID
	    IF @IsVersion=1
		BEGIN
		INSERT INTO [dbo].[Article_VersionLog]
				   ([Message]
				   ,[LogFrom]
				   ,[LogTo]
				   ,[StateID]
				   ,[DetailsArticle]
				   ,[Title]
				   ,[Summary]
				   ,[IsBlog]
				   ,[ArticleID]
				   ,[DetailsEditDOM]
				   ,[AddedOn]
				   ,[AddedBy])
			 SELECT  @Message,@AddedBy,AddedBy,StateID,Detail,Title,Summary,IsBlog,ArticleID,DetailsEditDOM,GETDATE(),@AddedBy FROM [dbo].[Article] WHERE [ArticleID]=@ArticleID
		END
 --   IF @IsStateOnlyUpdate =1 AND @IsAdmin=0
	--	BEGIN
	--	UPDATE [dbo].[Article] SET 	
	--		[StateID]=@StateID,
	--		[UpdatdOn]=GETDATE(),
	--		[UpdatedBy]=@AddedBy
	--		WHERE [ArticleID]=@ArticleID
	--	END
	--ELSE
		BEGIN
			UPDATE [dbo].[Article] SET 	
			[Title]=@Title,
			[Summary]=@Summary,
			[StateID]=@StateID,
			[DetailsEditDOM]=@DetailsEditDOM,
			[DetailsViewDOM]=@DetailsViewDOM,
			[UpdatdOn]=GETDATE(),
			[PublishDate]=GETDATE(),
			[UpdatedBy]=@AddedBy
			WHERE [ArticleID]=@ArticleID
		
		DELETE FROM [dbo].[Article_TypeArticleMapping] WHERE ArticleID=@ArticleID
		--SAVE aticletypes id  in Comma seperator  Article_TypeArticleMapping
	     INSERT INTO  [dbo].[Article_TypeArticleMapping] ([ArticleID],[ArticleTypeID],[SiteID])
		 select @ArticleID,*,@SiteID from [dbo].[Split](@ArticleTypsIDs,',')

		 DELETE FROM [dbo].[Article_CategoryMapping] WHERE ArticleID=@ArticleID
		--SAVE categoryid  in Comma seperator 
	     INSERT INTO [dbo].[Article_CategoryMapping]  ([ArticleID],[CategoryID],[SiteID])
		 select @ArticleID,*,@SiteID from [dbo].[Split](@Categories,',')

		-- INSERT EDITOR IMAGES IF NEW NEWS IS ADDED AND UPDATED BY HIM SELF
		IF @ArticleImages!=''
		BEGIN
		DELETE FROM [dbo].[Article_Media] WHERE ArticleID=@ArticleID AND IsForSummary=1
		INSERT INTO [dbo].[Article_Media]
           ([ArticleID]
           ,[MediaType]
           ,[MediaTitle]
           ,[FileName]
           ,[Source]
           ,[Description]
           ,[AddedOn]
           ,[AddedBy]     
           ,[IsBlog]
           ,[IsActive]
           ,[IsForSummary]
           ,[SiteID])
          VALUES
           (@ArticleID,'IMAGE','',@ArticleImages,'','',GETDATE(),@AddedBy,@IsBlog,1,1,@SiteID)
		END

		 UPDATE [dbo].[Article_Media]
		 SET IsForSummary=0
		 WHERE ArticleID=@ArticleID AND @ArticleImages=''

         UPDATE [dbo].[Article_Media]
		 SET IsForSummary=1
		 WHERE MediaID=@SummaryDefaultImgID

		END
	IF @Message=''
	  SET @Message= @TaskName
	  -- ACTIVITY LOG MESSAGE 
			INSERT INTO [dbo].[Article_ActivityLog]
				   ([ArticleID]
				   ,[ActivityDate]
				   ,[Message]
				   ,[StateID]
				   ,[SiteID]
				   ,[AddedBy])
			 VALUES
				   (@ArticleID,GETDATE(),@Message,@StateID,@SiteID,@AddedBy)
				set @OpStatus=2
   END
   ELSE
   BEGIN
   SET @OpStatus=-1; -- NOT AUTHORIZED 
   END
END
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_AddUpdateAgenda]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update agenda title and content.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_QuickDashboard_AddUpdateAgenda]
(
	@agendaTitle NVARCHAR(250),
	@agendFor DATE,
	@agendaTitleID INT = 0,
	@cultureCode NVARCHAR(50),
	@userName NVARCHAR(256),
	@siteID INT,
	@Contentxml NVARCHAR(MAX),
	@Status INT OUT
)
AS
BEGIN

SET NOCOUNT ON;
	
	DECLARE @xml XML = CAST(@ContentXml AS XML), @ContentID INT, @Cont NVARCHAR(500), @Count INT, @Counter INT = 1
	DECLARE @TempTable TABLE (
		ID INT IDENTITY(1,1),
		ContentID INT,
		Content NVARCHAR(500)
	)

	BEGIN TRANSACTION trans
		BEGIN TRY
			IF @agendaTitleID = 0
				BEGIN
					INSERT INTO Article_AgendaTitle(AgendaTitle, AgendaFor, IsDeleted, SiteID) VALUES (@agendaTitle, @agendFor, 0, @siteID);
					DECLARE @titleID int
					SET @agendaTitleID = SCOPE_IDENTITY();
				END
			ELSE
				BEGIN
					UPDATE Article_AgendaTitle SET AgendaTitle = @agendaTitle, AgendaFor = @agendFor WHERE AgendaTitleID = @agendaTitleID
					SELECT 0 AS TitleID;
				END

				INSERT INTO @TempTable
				SELECT
				N.value('(./id/text())[1]', 'INT') AS ContentID
				,(SELECT N.value('(./cont/text())[1]', 'NVARCHAR(500)') FOR XML PATH('')) AS Content
				FROM @xml.nodes('/content/data') AS T(N)
				SET @Count = @@ROWCOUNT

				WHILE(@Counter <= @Count)
				BEGIN
				SELECT
				@ContentID = ContentID,
				@Cont = Content
				FROM @TempTable
				WHERE ID=@Counter

				IF	@ContentID = 0
					BEGIN
					INSERT INTO Article_AgendaContent (AgendaContent, AgendaTitleID, CultureCode, AddedOn, AddedBy, IsDeleted, SiteID) 
				VALUES (@Cont, @agendaTitleID, @cultureCode, GETDATE(), @userName, 0, @siteID);
					END
				ELSE
					BEGIN
						UPDATE Article_AgendaContent SET AgendaContent = @Cont, UpdatedBy = @userName, UpdatedOn= GETDATE() 
						WHERE AgendaContentID = @ContentID;
					END
					SET @Counter = @Counter + 1;
				END
			IF @@TRANCOUNT > 0
				BEGIN COMMIT TRANSACTION trans
				SET @Status = 1
			END
		END TRY

		BEGIN CATCH
			IF @@TRANCOUNT > 0
				BEGIN ROLLBACK TRANSACTION trans
				SET @Status = 0
			END
		END CATCH
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_DeleteAgenda]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Add update agenda title and content.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_QuickDashboard_DeleteAgenda]
(
	@siteID INT,
	@agendaTitleID INT,
	@agendaContentID INT,
	@username NVARCHAR(256)
)
AS
BEGIN
	SET NOCOUNT ON;

	BEGIN TRANSACTION;
	SAVE TRANSACTION SavePoint;

	BEGIN TRY
		IF @agendaContentID = 0
			BEGIN
				UPDATE Article_AgendaTitle SET IsDeleted = 1, DeletedOn = GETDATE(), DeletedBy = @username WHERE AgendaTitleID = @agendaTitleID AND SiteID = @siteID;
				UPDATE Article_AgendaContent SET IsDeleted = 1, DeletedOn = GETDATE(), DeletedBy = @username WHERE AgendaTitleID = @agendaTitleID AND SiteID = @siteID;
			END
		ELSE
			BEGIN
				UPDATE Article_AgendaContent SET IsDeleted = 1, DeletedOn = GETDATE(), DeletedBy = @username WHERE AgendaContentID = @agendaContentID AND SiteID = @siteID;
			END
	END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
		BEGIN
			ROLLBACK TRANSACTION SavePoint;
		END
	END CATCH
	COMMIT TRANSACTION
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetAgendaAllActiveAgenda]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Get active agenda.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_QuickDashboard_GetAgendaAllActiveAgenda]
@SiteID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM Article_AgendaTitle
	WHERE AgendaFor >= CONVERT(DATE, GETDATE()) AND Article_AgendaTitle.IsDeleted = 0 AND Article_AgendaTitle.IsActive = 1 AND SiteID = @SiteID
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetAgendaByTitleID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Get agenda content by agenda title id.
-- ---------------------------------------------

CREATE PROC [dbo].[usp_Article_QuickDashboard_GetAgendaByTitleID]
(
	@siteID INT,
	@agendaTitleID INT
)
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
	AgendaContent, 
	AgendaContentID AS AgendaContentID, 
	AgendaTitle, 
	AT.AgendaTitleID, AT.AgendaFor 
	FROM Article_AgendaTitle AT
	INNER JOIN Article_AgendaContent AC ON AC.AgendaTitleID = AT.AgendaTitleID
	WHERE 
	AT.AgendaTitleID = @agendaTitleID AND AC.IsDeleted = 0 AND AT.IsDeleted = 0 AND AC.SiteID = @siteID 
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetAgendaTitleByDate]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_QuickDashboard_GetAgendaTitleByDate]
(
	@siteID INT,
	@pageNumber INT,
	@pageSize INT
)
AS
BEGIN
	SET NOCOUNT ON;
		SELECT
		COUNT (AgendaTitleID) OVER() RowsCount,
		* FROM Article_AgendaTitle 
		WHERE IsDeleted = 0 AND SiteID = @siteID
		ORDER BY AgendaFor DESC
		OFFSET @pageNumber ROWS
		FETCH NEXT @pageSize ROWS ONLY
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetArticleByStateID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ----------------------------------------------
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Select list of articles based on state ID>
--EXEC [dbo].[usp_Article_QuickDashboard_GetArticleByStateID] 9,'','',1,20,'69A340A4-5B55-475E-8447-4C552F867F00',0,'aishwarya'
-- ----------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_QuickDashboard_GetArticleByStateID]
	@StateIDs nvarchar(50),
	@PageNumber INT ,
    @PageSize INT ,
	@RoleID nvarchar(MAX),
	@SiteID int,
	@UserName nvarchar(256)
	
	AS
	BEGIN
	DECLARE @totalRowCount int
	

        SET NOCOUNT ON; 
        SELECT
		        A.ArticleID ,
                AC.CategoryID ,
                AC.CategoryName ,
                AAM.ArticleAuthorID ,
                AAM.UserID ,
				AU.FirstName +'#'+AU.LastName AS Author,
                A.Title ,
                A.Location ,
                A.AddedOn ,
				A.PublishDate,
                A.StateID 
        INTO    #temp
        FROM    dbo.Article AS A
        LEFT JOIN dbo.Article_CategoryMapping AS ACM
                ON ACM.ArticleID = A.ArticleID
        LEFT JOIN dbo.Article_Category AS AC
                ON AC.CategoryID = ACM.CategoryID
        LEFT JOIN dbo.Article_AuthorMapping AS AAM
                ON AAM.ArticleID = A.ArticleID
	    LEFT JOIN aspnet_Users AU
				ON AU.UserID=AAM.UserID
			WHERE 		    
			A.StateID IN ( SELECT * FROM dbo.Split(@StateIDs, ','))
			AND
			A.SiteID = @SiteID
			AND
			(
			   (@RoleID LIKE '%910f0c31-e1dd-42d2-988b-545fe8621544%' OR @RoleID LIKE '%228F0AD3-76B3-4585-A008-091AE667AD57%' OR @RoleID LIKE '%6259CD4E-9746-4B6F-A347-A1035DE7EFDD%') 
			   OR
			   (@RoleID LIKE '%69A340A4-5B55-475E-8447-4C552F867F00%' AND A.AddedBy=@UserName)
			   OR
			   (@RoleID LIKE '%521832A1-52F1-432C-8CF1-0CAEDEFC6BA4%' AND A.AssignTo=@UserName)
			   OR
			   (A.AddedBy = @UserName OR A.AssignTo = @UserName)	
			)
   SELECT   
   DISTINCT
               
                T2.ArticleID ,
				T2.Title,
                T2.StateID ,
                T2.AddedOn ,
				T2.PublishDate,
                STUFF(( SELECT DISTINCT
                                ', ' + T.CategoryName
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.CategoryName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryName ,
                STUFF(( SELECT DISTINCT
                                ', ' + T.Author
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.UserID,
								t.Author
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS Author 
           into #temporary       
        FROM    #temp AS T2 
        GROUP BY T2.ArticleID ,
				T2.Title,
                T2.CategoryName ,
                T2.UserID ,
                T2.StateID ,
                T2.AddedOn,
				T2.PublishDate
        ORDER BY T2.ArticleID DESC ,
                CategoryName ,
                T2.StateID , 
                T2.AddedOn
        OFFSET @pageNumber ROWS
		FETCH NEXT @pageSize ROWS ONLY;

		SELECT COUNT(ArticleID) OVER() AS RowTotal,* from #temporary
        DROP TABLE #temp;
		drop table #temporary;

    END;
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetMostCommentedArticle]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/22/2017 10:41:10 AM
-- Description:	<Description,,>
-- ---------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_QuickDashboard_GetMostCommentedArticle]
	@SiteID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT
		A.ArticleID,
		AC.CategoryID,
		AC.CategoryName,
		AAM.ArticleAuthorID,
		AAM.UserID,
		AU.FirstName + '#' + AU.LastName AS Author,
		A.Title,
		A.PublishDate,
		AM.FileName,
		ASCo.CommentCount
	INTO #temp
	FROM dbo.Article AS A
	LEFT JOIN dbo.Article_CategoryMapping AS ACM
		ON ACM.ArticleID = A.ArticleID
	LEFT JOIN dbo.Article_Category AS AC
		ON AC.CategoryID = ACM.CategoryID
	LEFT JOIN dbo.Article_AuthorMapping AS AAM
		ON AAM.ArticleID = A.ArticleID
	LEFT JOIN aspnet_Users AU
		ON AU.UserID = AAM.UserID
	LEFT JOIN Article_Media AS AM
		ON AM.ArticleID = A.ArticleID AND IsForSummary = 1 AND MediaType = 'image'
	INNER JOIN dbo.Article_SocialComment AS ASCo
		ON ASCo.ArticleID = A.ArticleID
	WHERE StateID = 9 AND A.SiteID = @SiteID AND ASCo.SiteID = @SiteID AND ASCo.CommentCount > 0

	SELECT
	DISTINCT
		T2.ArticleID,
		T2.Title,
		T2.PublishDate,
		T2.FileName,
		T2.CommentCount,
		STUFF(( SELECT DISTINCT
				', ' + T.CategoryName
				FROM #temp AS T
				WHERE T.ArticleID = T2.ArticleID
				GROUP BY T.ArticleID,
						T.CategoryName
				FOR
					XML PATH('')
				), 1, 1, '') AS CategoryName,
		STUFF(( SELECT DISTINCT
				', ' + T.Author
				FROM #temp AS T
				WHERE T.ArticleID = T2.ArticleID
				GROUP BY T.ArticleID ,
						T.UserID,
						T.Author
				FOR
					XML PATH('')
					), 1, 1, '') AS Author
		INTO #temporary
		FROM #temp AS T2
		GROUP BY T2.ArticleID,
				T2.Title,
				T2.CategoryName,
				T2.PublishDate,
				T2.FileName,
				T2.CommentCount
		
		SELECT TOP 5 * FROM #temporary 
		ORDER BY 
		CommentCount DESC,
		PublishDate DESC;
		DROP TABLE #temp;
		DROP TABLE #temporary;
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetStatistics]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/13/2017 10:42:42 AM
-- Description:	Get news statistics based on username
-- ---------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_QuickDashboard_GetStatistics]
	@RoleID nvarchar(MAX),
	@UserName nvarchar(256),
	@SiteID INT
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @tempTable TABLE(
		ArticleID INT,
		StateID INT
	)
	INSERT INTO @tempTable
	SELECT
		DISTINCT 
		A.ArticleID, 
		A.StateID FROM Article A
		WHERE
		SiteID = @SiteID
		AND
		(
			(@RoleID LIKE '%910f0c31-e1dd-42d2-988b-545fe8621544%' OR @RoleID LIKE '%228F0AD3-76B3-4585-A008-091AE667AD57%' OR @RoleID LIKE '%6259CD4E-9746-4B6F-A347-A1035DE7EFDD%')
			OR
			(@RoleID LIKE '%69A340A4-5B55-475E-8447-4C552F867F00%' AND A.AddedBy=@UserName)
			OR
			(@RoleID LIKE '%521832A1-52F1-432C-8CF1-0CAEDEFC6BA4%' AND A.AssignTo=@UserName)
		)

	DECLARE @totalPublish INT, @totalHold INT, @totalRejected INT
	SET @totalPublish = (SELECT COUNT(ArticleID) FROM @tempTable WHERE StateID = 9);
	SET @totalHold = (SELECT COUNT(ArticleID) FROM @tempTable WHERE StateID = 7);
	SET @totalRejected = (SELECT COUNT(ArticleID) FROM @tempTable WHERE StateID = 6 OR StateID = 2);

	SELECT @totalPublish AS TotalPublish, @totalHold AS TotalHold, @totalRejected AS TotalRejected
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetTitleByTitleID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/13/2017 10:42:42 AM
-- Description:	Get Agenda Title by title id
-- ---------------------------------------------
CREATE PROC [dbo].[usp_Article_QuickDashboard_GetTitleByTitleID]
@siteID int,
@agendaTitleID int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM Article_AgendaTitle WHERE AgendaTitleID = @agendaTitleID AND SiteID = @siteID
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_GetTrendingArticle]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- ---------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_QuickDashboard_GetTrendingArticle] 
	@SiteID INT
AS
BEGIN
	SET NOCOUNT ON;
	SELECT 
	A.ArticleID,
	A.Title, 
	A.Summary,
	AC.CategoryID,
	AC.CategoryName,
	AAM.ArticleAuthorID,
	AAM.UserID,
	AU.FirstName + '#' + AU.LastName AS Author,
	A.PublishDate,
	AM.FileName
	INTO #temp
	FROM Article A
	INNER JOIN Article_TypeArticleMapping ATM 
		ON A.ArticleID = ATM.ArticleID
	INNER JOIN Article_Types AT 
		ON ATM.ArticleTypeID = AT.ArticleTypeID
	LEFT JOIN Article_CategoryMapping AS ACM
		ON ACM.ArticleID = A.ArticleID
	LEFT JOIN Article_Category AS AC
		ON AC.CategoryID = ACM.CategoryID
	LEFT JOIN Article_AuthorMapping AS AAM
		ON AAM.ArticleID = A.ArticleID
	LEFT JOIN aspnet_Users AU
		ON AU.UserID = AAM.UserID
	LEFT JOIN Article_Media AS AM
		ON AM.ArticleID = A.ArticleID AND IsForSummary = 1 AND MediaType = 'image'
	WHERE AT.ArticleTypeID = 1 AND A.SiteID = @SiteID AND StateID = 9

	SELECT
	DISTINCT
		T2.ArticleID,
		T2.Title,
		T2.Summary,
		T2.PublishDate,
		T2.FileName,
		STUFF(( SELECT DISTINCT
				', ' + T.CategoryName
				FROM #temp AS T
				WHERE T.ArticleID = T2.ArticleID
				GROUP BY T.ArticleID,
					T.CategoryName
				FOR
					XML PATH('')
				), 1, 1, '') AS CategoryName,
		STUFF(( SELECT DISTINCT
				', ' + T.Author
				FROM #temp AS T
				WHERE T.ArticleID = T2.ArticleID
				GROUP BY T.ArticleID,
					T.UserID,
					T.Author
				FOR
					XML PATH('')
					), 1, 1, '') AS Author
			INTO #temporary
			FROM #temp AS T2
			GROUP BY T2.ArticleID,
					T2.Title,
					T2.Summary,
					T2.CategoryName,
					T2.PublishDate,
					T2.FileName

			SELECT TOP 5 * FROM #temporary ORDER BY PublishDate DESC;
			DROP TABLE #temp;
			DROP TABLE #temporary;
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_QuickDashboard_UpdateAgendaStatus]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[usp_Article_QuickDashboard_UpdateAgendaStatus]
@agendaTitleID int,
@activeStatus bit
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Article_AgendaTitle SET IsActive = @activeStatus WHERE AgendaTitleID = @agendaTitleID;
	UPDATE Article_AgendaTitle SET IsActive = 0 WHERE NOT AgendaTitleID = @agendaTitleID; 
END
GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_AddActivityLog]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Aishwarya Shakya
-- Create date: 20174
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_Article_Reporter_AddActivityLog] 
@ArticleID INT,
@Message NVARCHAR(250),
@StateID INT,
@AddedBy NVARCHAR(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    INSERT INTO dbo.Article_ActivityLog
	        ( ArticleID ,
	          ActivityDate ,
	          Message ,
	          StateID ,
	          AddedBy
	        )
	VALUES  ( @ArticleID , -- ArticleID - int
	          GETDATE() , -- ActivityDate - datetime
	          @Message , -- Message - nvarchar(250)
	          @StateID , -- StateID - int
	          @AddedBy  -- AddedBy - nvarchar(250)
	        )    
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_AddArticleVersionLog]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>

CREATE PROCEDURE [dbo].[usp_Article_Reporter_AddArticleVersionLog] 
@Message nvarchar(250),
@LogFrom nvarchar(50),
@LogTo nvarchar(50),
@StateID int,
@DetailsArticle nvarchar(50),
@Title nvarchar(250),
@Summary nvarchar(250),
@IsBlog bit,
@ArticleID int,
@AddedOn datetime,
@AddedBy nvarchar(100)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    INSERT INTO Article_VersionLog--DetailsEditDOM
	([Message],LogFrom, LogTo, StateID,DetailsArticle,Title,Summary,IsBlog,ArticleID,AddedOn,AddedBy)
	VALUES
	(@Message,@LogFrom,@LogTo,@StateID,@DetailsArticle,@Title,@Summary,@IsBlog,@ArticleID,@AddedOn,@AddedBy)	
    --LogID Message LogFrom LogTo StateID  DetailsArticle  Title Summary IsBlog ArticleID DetailsEditDOM AddedOn AddedBy
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_AddUpdateReporterNews]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Aishwarya Shakya
-- Create date: 11/09/2017
-- Description:	For Add Update Reporter News
-- 
CREATE Procedure [dbo].[usp_Article_Reporter_AddUpdateReporterNews]
@ArticleID int,
@Title nvarchar(250),
@Summary nvarchar(500),
@Detail nvarchar(MAX),
@NewsSource nvarchar(50),
@Quotation nvarchar(256),
@StateID int,
@ArticleEntryType int,
@OpinionBy nvarchar(256),
@AssignTo nvarchar(256),
@IsBlog bit,
@CultureCode nvarchar(20),
@AddedBy nvarchar(256),
@UpdatedBy nvarchar(256),
@IsCustomReport bit,
@CustomReport nvarchar(256),
@CatergoryIDs nvarchar(256),
@UserIDs nvarchar(max),
@ExternalLinks nvarchar(256),
@LinkType nvarchar(100),
@MediaType nvarchar(100),
@Message nvarchar(250),
@RoleID nvarchar(250),
@SiteID int,
@ArticleIDOut nvarchar(100) out
--@StateIdOut int out
as
BEGIN

DECLARE 
@IntLocation int,
@CategoryID int,
@UserID uniqueidentifier,
@Link nvarchar(250),
@AddedByLog nvarchar(250),
@IsVersion BIT,
@IsStateOnlyUpdate BIT,
@TaskName NVARCHAR(250),
@PrevState int,
@OpStatus int--make it out parameter



IF @ArticleID=0
BEGIN

	INSERT INTO [dbo].[Article]
	([Title],
	[Summary],
	[Detail],
	[NewsSource],
	[Quotation],
	[StateID],
	[ArticleEntryType],
	[OpinionBy],
	[AssignTo],
	[IsBlog],
	[CultureCode],
	[AddedBy],
	[AddedOn],
	[IsCustomReport],
	[CustomReport],
	[PublishDate],
	[UpdatdOn],
	[SiteID]
		)
		 VALUES
	(@Title,@Summary,@Detail,@NewsSource,@Quotation,@StateID,@ArticleEntryType,@OpinionBy,
		@AssignTo,@IsBlog,@CultureCode,@AddedBy,GETDATE(),@IsCustomReport,@CustomReport,GETDATE(),GETDATE(),@SiteID)
		
		SET @ArticleID=SCOPE_IDENTITY()		

		--SAVE ArticleID  in Comma seperator  category mapping
		WHILE (CHARINDEX(',',    @CatergoryIDs, 1) > 0)
        BEGIN
              SET @IntLocation =   CHARINDEX(',',    @CatergoryIDs, 0)      
              INSERT INTO   Article_CategoryMapping (CategoryID,ArticleID,SiteID)
              --LTRIM and RTRIM to ensure blank spaces are   removed
              SELECT RTRIM(LTRIM(SUBSTRING(@CatergoryIDs,   0, @IntLocation))),@ArticleID ,@SiteID  
              SET @CatergoryIDs = STUFF(@CatergoryIDs,   1, @IntLocation,   '') 
        END
		
		If(@IsCustomReport=0)
		BEGIN
			--save ArticleID and Comma seperator author mapping
			WHILE (CHARINDEX(',',    @UserIDs, 1) > 0)
			BEGIN
				SET @IntLocation =   CHARINDEX(',',    @UserIDs, 0)      
				INSERT INTO   Article_AuthorMapping (UserID,ArticleID,SiteID)
				--LTRIM and RTRIM to ensure blank spaces are   removed
				SELECT RTRIM(LTRIM(SUBSTRING(@UserIDs,   0, @IntLocation))),@ArticleID,@SiteID
				SET @UserIDs = STUFF(@UserIDs,   1, @IntLocation,   '') 
			END
		END
		
		

		IF(@ExternalLinks<>'')
		BEGIN
			--save ArticleID and Comma seperator ExternalLinks mapping
			WHILE (CHARINDEX(',',    @ExternalLinks, 1) > 0)
			BEGIN
				SET @IntLocation =   CHARINDEX(',',    @ExternalLinks, 0)      
				INSERT INTO   Article_ExternalLinks (ArticleID,LinkURL,LinkType,MediaType,AddedBy,AddedOn,SiteID)
				--LTRIM and RTRIM to ensure blank spaces are   removed
				SELECT @ArticleID,RTRIM(LTRIM(SUBSTRING(@ExternalLinks,   0, @IntLocation))),@LinkType,@MediaType,@AddedBy,GETDATE(),@SiteID  
				SET @ExternalLinks = STUFF(@ExternalLinks,   1, @IntLocation,   '') 
			END		
		END
		

		SET	@ArticleIDOut=@ArticleID		

	END
ELSE
	SELECT @PrevState=StateID FROM Article WHERE ArticleID=@ArticleID
	IF EXISTS(SELECT 1 FROM AdminCommon_Workflow WHERE InputState=@PrevState AND OutputState=@StateID AND RoleID=@RoleID) -- CHECK PERMISSION FOR CURRENT STATE IS ALLOW OR NOT
	BEGIN
		SELECT @IsVersion=[IsManageVersion],@IsStateOnlyUpdate=[IsStateUpdateOnly],@TaskName=[TaskName] From [dbo].[Article_State] where StateID=@StateID
		IF @IsStateOnlyUpdate=1
		BEGIN
			UPDATE [dbo].[Article] SET 
			[StateID]=@StateID
			WHERE [ArticleID]=@ArticleID	
		END
		ELSE
		BEGIN
			UPDATE [dbo].[Article] SET 	
			[Title]=@Title,
			[Summary]=@Summary,
			[Detail]=@Detail,
			[NewsSource]=@NewsSource,
			[Quotation]=@Quotation,
			[StateID]=@StateID,
			[ArticleEntryType]=@ArticleEntryType,
			[OpinionBy]=@OpinionBy,
			[AssignTo]=@AssignTo,
			[IsBlog]=@IsBlog,
			[CultureCode]=@CultureCode,
			[PublishDate]=GETDATE(),		
			[UpdatdOn]=GETDATE(),
			[UpdatedBy]=@UpdatedBy,
			[IsCustomReport]=@IsCustomReport,
			[CustomReport]=@CustomReport
			WHERE [ArticleID]=@ArticleID

			--UPDATE ArticleID  in Comma seperator  category mapping
			create table #temp(ArticleID int,CategoryID int)
			WHILE (CHARINDEX(',',    @CatergoryIDs, 1) > 0)
			BEGIN
				SET @IntLocation =   CHARINDEX(',',    @CatergoryIDs, 0)      
				SET @CategoryID=RTRIM(LTRIM(SUBSTRING(@CatergoryIDs,   0, @IntLocation)))
			  
				INSERT INTO #temp (ArticleID,CategoryID) values(@ArticleID,@CategoryID)
				SET @CatergoryIDs = STUFF(@CatergoryIDs,   1, @IntLocation,   '') 
			END 	

				DELETE FROM Article_CategoryMapping where ArticleID=@ArticleID

			  	MERGE dbo.Article_CategoryMapping AS Target
				USING #temp AS source	
				ON (Target.ArticleID=Source.ArticleID AND Target.CategoryID=source.CategoryID)
				WHEN NOT MATCHED BY TARGET THEN 
				INSERT (ArticleID,CategoryID) VALUES(Source.ArticleID,Source.CategoryID);
				--OUTPUT $action,
				--Deleted.CategoryID AS CategoryTarget,
				--Deleted.ArticleID AS ArticleTarget,
				--Inserted.ArticleID AS ArticleSource,
				--Inserted.CategoryID AS CategorySource;
				SELECT @@ROWCOUNT;             
              
			  DROP TABLE #temp

			--UPDATE ArticleID and Comma seperator author mapping
			CREATE table #temp1(ArticleID int,UserID uniqueidentifier)
			WHILE (CHARINDEX(',',    @UserIDs, 1) > 0)
			BEGIN
				SET @IntLocation =   CHARINDEX(',',    @UserIDs, 0)  
				SET @UserID = RTRIM(LTRIM(SUBSTRING(@UserIDs,   0, @IntLocation)))
				INSERT INTO #temp1 (ArticleID,UserID) values(@ArticleID,@UserID)
				SET @UserIDs = STUFF(@UserIDs,   1, @IntLocation,   '')               
			END
			DELETE FROM Article_AuthorMapping where ArticleID=@ArticleID

				MERGE dbo.Article_AuthorMapping AS Target
				USING #temp1 AS source	
				ON (Target.ArticleID=SOURCE.ArticleID AND Target.UserID=source.UserID)
				WHEN NOT MATCHED BY TARGET THEN --AND Target.CategoryID<>source.CategoryID				 				
				INSERT (ArticleID,UserID) VALUES(Source.ArticleID,Source.UserID);				
				SELECT @@ROWCOUNT;              
			  drop table #temp1

			--UPDATE External Link and Comma seperator author mapping
			CREATE table #temp3(ArticleID int,LinkURL nvarchar(250),LinkType nvarchar(50),MediaType nvarchar(20),AddedBy nvarchar(256),AddedOn datetime)
			WHILE (CHARINDEX(',',    @ExternalLinks, 1) > 0)
			BEGIN
				SET @IntLocation =   CHARINDEX(',',    @ExternalLinks, 0)  
				SET @Link = RTRIM(LTRIM(SUBSTRING(@ExternalLinks,   0, @IntLocation)))
				INSERT INTO #temp3 (ArticleID,LinkURL,LinkType,MediaType,AddedBy,AddedOn) values(@ArticleID,@Link,@LinkType,@MediaType,@AddedBy,GETDATE())
				SET @ExternalLinks = STUFF(@ExternalLinks,   1, @IntLocation,   '')               
			END

			DELETE FROM Article_ExternalLinks where ArticleID=@ArticleID
				MERGE dbo.Article_ExternalLinks AS Target
				USING #temp3 AS source	
				ON (Target.ArticleID=SOURCE.ArticleID AND Target.LinkURL=source.LinkURL)
				WHEN NOT MATCHED BY TARGET THEN 				
				INSERT (ArticleID,LinkURL,LinkType,MediaType,AddedBy,AddedOn) 
				VALUES
				(Source.ArticleID,Source.LinkURL,Source.LinkType,Source.MediaType,Source.AddedBy,Source.AddedOn);				
				SELECT @@ROWCOUNT;              
              
				drop table #temp3

					
			
		
END
	IF @Message=''
			SET @Message= @TaskName
			-- ACTIVITY LOG MESSAGE 
			INSERT INTO [dbo].[Article_ActivityLog]
				   ([ArticleID]
				   ,[ActivityDate]
				   ,[Message]
				   ,[StateID]
				   ,[AddedBy]
				   ,[SiteID])
			 VALUES
				   (@ArticleID,GETDATE(),@Message,@StateID,@AddedBy,@SiteID)
				set @OpStatus=2
SET	@ArticleIDOut=@ArticleID

	END--If EXISTS
 ELSE
	BEGIN
		SET @OpStatus=-1; -- NOT AUTHORIZED 
	END
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_AddUpdateReporterNewsInMedia]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: <Create Date,,>
-- Description:	<Description,,>

CREATE PROCEDURE [dbo].[usp_Article_Reporter_AddUpdateReporterNewsInMedia]
	--for Media
@MediaType nvarchar(20),
@MediaTitle nvarchar(250),
@FileName nvarchar(100),
@AddedBy nvarchar(256),
@UpdatedBy nvarchar(256),
@IsBlog BIT,
@IsSummary bit,
--@FileName nvarchar(100),
@Source nvarchar(100),
@Description nvarchar(250),
@IsActive bit,
@ArticleID INT,
@SiteID int,
@ArticleIDRef int

--@FileNameLists nvarchar(256),
--@ExternalLinks nvarchar(256)
--@LinkType nvarchar(50),
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	--declare @mediaid int
	
	--If(@ArticleIDRef=0)
	--begin
	INSERT INTO dbo.Article_Media
            ( ArticleID ,
              MediaType ,
              MediaTitle ,
              [FileName] ,
              [Source] ,
              [Description] ,
              AddedOn ,
              AddedBy ,
              UpdatedOn ,
              UpdatedBy ,
              IsBlog ,
              IsActive,
			  IsForSummary,
			  SiteID              
            )
    VALUES  ( @ArticleID , -- ArticleID - bigint
              @MediaType , -- MediaType - nvarchar(20)
              @MediaTitle , -- MediaTitle - nvarchar(250)
              @FileName , -- FileName - nvarchar(100)
              @Source , -- Source - nvarchar(100)
              @Description , -- Description - nvarchar(250)
              GETDATE() , -- AddedOn - datetime
              @AddedBy , -- AddedBy - nvarchar(256)
              GETDATE() , -- UpdatedOn - datetime
              @UpdatedBy , -- UpdatedBy - nvarchar(256)
              @IsBlog , -- IsBlog - bit
              @IsActive, -- IsActive - bit        
			  @IsSummary,      
			  @SiteID
            )
	--end
	--else
	--begin
			--SELECT @mediaid=MediaID from Article_Media where ArticleID=@ArticleID
			--DELETE FROM Article_Media where ArticleID=@ArticleID and MediaID=@mediaid

			--INSERT INTO dbo.Article_Media
   --         ( ArticleID ,
   --           MediaType ,
   --           MediaTitle ,
   --           [FileName] ,
   --           [Source] ,
   --           [Description] ,
   --           AddedOn ,
   --           AddedBy ,
   --           UpdatedOn ,
   --           UpdatedBy ,
   --           IsBlog ,
   --           IsActive,
			--  SiteID              
   --         )
   -- VALUES  ( @ArticleID , -- ArticleID - bigint
   --           @MediaType , -- MediaType - nvarchar(20)
   --           @MediaTitle , -- MediaTitle - nvarchar(250)
   --           @FileName , -- FileName - nvarchar(100)
   --           @Source , -- Source - nvarchar(100)
   --           @Description , -- Description - nvarchar(250)
   --           GETDATE() , -- AddedOn - datetime
   --           @AddedBy , -- AddedBy - nvarchar(256)
   --           GETDATE() , -- UpdatedOn - datetime
   --           @UpdatedBy , -- UpdatedBy - nvarchar(256)
   --           @IsBlog , -- IsBlog - bit
   --           @IsActive, -- IsActive - bit  
			--  @SiteID            
   --         )


		--UPDATE Article_Media SET 
		--		MediaType=@MediaType,
		--		MediaTitle=@MediaTitle,
		--		[Source]=@Source,
		--		[Description]=@Description,
		--		[FileName]=@FileName,
		--		UpdatedBy=@UpdatedBy
		--	WHERE ArticleID=@ArticleID

			
	--end
	
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_DeleteNewsFromMedia]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[usp_Article_Reporter_DeleteNewsFromMedia] 
	@ArticleID int
AS
BEGIN	
	SET NOCOUNT ON;

    DELETE FROM Article_Media where ArticleID=@ArticleID

END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_DeleteReporterNewsByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: 11/20/2017
-- Description:	Delete Reporter News By ID
--exec [dbo].[usp_Article_Reporter_DeleteReporterNewsByID] '<article><id>15</id></article>'

CREATE PROCEDURE [dbo].[usp_Article_Reporter_DeleteReporterNewsByID] @ArticleID NVARCHAR(max)
AS
    BEGIN
        DECLARE @delArtXML XML= CAST(@ArticleID AS XML);
        SET NOCOUNT ON;

		 INSERT INTO 
		[dbo].[Article_RecycleBin]
			([Title]
			,[Summary]
			,[Detail]
			,[NewsSource]
			,[Quotation]
			,[StateID]
			,[ArticleEntryType]
			,[PublishDate]
			,[OpinionBy]
			,[Location]
			,[DetailsEditDOM]
			,[DetailsViewDOM]
			,[AssignTo]
			,[IsBlog]
			,[CultureCode]
			,[AddedBy]
			,[AddedOn]
			,[UpdatdOn]
			,[UpdatedBy]
			,[IsCustomReport]
			,[CustomReport]
			,[SiteID])
		SELECT
			[Title]
			,[Summary]
			,[Detail]
			,[NewsSource]
			,[Quotation]
			,[StateID]
			,[ArticleEntryType]
			,[PublishDate]
			,[OpinionBy]
			,[Location]
			,[DetailsEditDOM]
			,[DetailsViewDOM]
			,[AssignTo]
			,[IsBlog]
			,[CultureCode]
			,[AddedBy]
			,[AddedOn]
			,[UpdatdOn]
			,[UpdatedBy]
			,[IsCustomReport]
			,[CustomReport]
			,[SiteID]
		FROM [dbo].[Article]  
		WHERE [ArticleID] IN ( SELECT   N.value('(./text())[1]', 'int') AS ArticleID
                               FROM     @delArtXML.nodes('article/id') AS T ( N ) );

        DELETE  FROM dbo.Article
        WHERE   ArticleID IN ( SELECT   N.value('(./text())[1]', 'int') AS ArticleID
                               FROM     @delArtXML.nodes('article/id') AS T ( N ) );
 
        DELETE  FROM dbo.Article_AuthorMapping
        WHERE   ArticleID IN ( SELECT   N.value('(./text())[1]', 'int') AS ArticleID
                               FROM     @delArtXML.nodes('article/id') AS T ( N ) );

        DELETE  FROM dbo.Article_CategoryMapping
        WHERE   ArticleID IN ( SELECT   N.value('(./text())[1]', 'int') AS ArticleID
                               FROM     @delArtXML.nodes('article/id') AS T ( N ) );

        DELETE  FROM dbo.Article_ExternalLinks
        WHERE   ArticleID IN ( SELECT   N.value('(./text())[1]', 'int') AS ArticleID
                               FROM     @delArtXML.nodes('article/id') AS T ( N ) );

        DELETE  FROM dbo.Article_Media
        WHERE   ArticleID IN ( SELECT   N.value('(./text())[1]', 'int') AS ArticleID
                               FROM     @delArtXML.nodes('article/id') AS T ( N ) );
	--DELETE FROM dbo.Article WHERE ArticleID=@ArticleID
	--DELETE FROM dbo.Article_AuthorMapping WHERE ArticleID=@ArticleID
	--DELETE FROM dbo.Article_CategoryMapping WHERE ArticleID=@ArticleID
	--DELETE FROM dbo.Article_ExternalLinks WHERE ArticleID=@ArticleID
	--DELETE FROM dbo.Article_Log WHERE ArticleID=@ArticleID
	--DELETE FROM dbo.Article_Media WHERE ArticleID=@ArticleID

    END;

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetAllActivityLog]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetAllActivityLog]
	@ArticleID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   Select ActivityDate,Message,AAL.StateID,AAS.[State],AAS.StateClass,AU.FirstName+'#'+AU.LastName AS AddedBy from Article_ActivityLog AAL
   inner join Article_State AAS
  
   ON AAL.StateID=AAS.StateID
    inner join [dbo].[aspnet_Users] AU
	ON AU.Username=AAL.AddedBy
   where AAL.ArticleID=@ArticleID
   ORDER BY ActivityDate DESC
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetAllActivityVersionLog]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetAllActivityVersionLog]
	@ArticleID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

 SELECT AVL.ArticleID,[Message],LogFrom,LogTo,AVL.StateID,AST.[State],AST.StateClass,Title,Summary,AVL.IsBlog,ArticleID,AVL.AddedOn,AU.FirstName+'#'+AU.LastName AS AddedBy
  from Article_VersionLog AVL
  INNER JOIN dbo.Article_State AST
  ON AVL.StateID=AST.StateID
  INNER JOIN [dbo].[aspnet_Users] AU
  ON AU.Username=AVL.AddedBy
  WHERE ArticleId=@ArticleID
  ORDER BY AddedOn DESC
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetAllDataByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		<Aishwarya Shakya>
-- Create date: <2017-Nov-15>
-- Description:	<List all ArticleID with mapped CategoryName, Authors and FileName into Gridview>
--EXEC [dbo].[usp_Article_Reporter_GetAllDataByID] 47

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetAllDataByID] 
@ArticleID int

AS
    BEGIN
        SET NOCOUNT ON; 

		SELECT A.ArticleID,A.Title,A.Summary,A.Detail,A.NewsSource,A.Quotation,A.StateID,ARS.[State],A.ArticleEntryType,
				A.OpinionBy,A.Location,A.AssignTo,A.IsBlog,A.AddedBy,A.AddedOn,A.IsCustomReport,A.CustomReport,A.DetailsViewDOM				
				from Article A 
				LEFT JOIN Article_State ARS
				ON A.StateID=ARS.StateID
				WHERE A.ArticleID=@ArticleID        

		SELECT AM.ArticleID,AM.[Source],AM.[Description],AM.MediaTitle,AM.MediaType,AM.[FileName],AM.AddedOn,AM.AddedBy 
		FROM dbo.Article_Media AS AM WHERE AM.ArticleID=@ArticleID
		
		SELECT ACM.ArticleID,ACM.CategoryID,AC.CategoryName from Article_CategoryMapping ACM 
		inner JOIN Article_Category AC
		on ACM.CategoryID=AC.CategoryID	
		where ACM.ArticleID=@ArticleID

		SELECT AAM.ArticleID,AAM.UserID,(AU.FirstName+' '+Au.LastName) As Author from Article_AuthorMapping AAM
		INNER JOIN Article A
		ON AAM.ArticleID=A.ArticleID
		Inner JOIN aspnet_Users AU 
		ON AU.UserID=AAM.UserID
		WHERE AAM.ArticleID=@ArticleID

		SELECT AEL.ArticleID,LinkURL FROM Article_ExternalLinks AEL
		INNER JOIN Article A
		ON AEL.ArticleID=A.ArticleID
		WHERE AEL.ArticleID=@ArticleID
    END;

	

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetAllDataIntoGrid]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		<Aishwarya Shakya>
-- Create date: <2017-Nov-15>
-- Description:	<List all ArticleID with mapped CategoryName, Authors and FileName into Gridview>
--EXEC [dbo].[usp_Article_Reporter_GetAllDataIntoGrid] 0,20
--EXEC [dbo].[usp_Article_Reporter_GetAllDataIntoGrid] 0,20,'reporter','<category><catid>1</catid><catid>3</catid></category>','','','','2015','2020'
--EXEC [dbo].[usp_Article_Reporter_GetAllDataIntoGrid] 0,20,'','','','','','','','aishwarya','69A340A4-5B55-475E-8447-4C552F867F00',0

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetAllDataIntoGrid]
 @OffSet INT, 
 @Limit INT,
 @Keywords nvarchar(250),
 @CategoryIDs nvarchar(250),
 @Location NVARCHAR(50),
 --@Reporter NVARCHAR(50),
 @Editor NVARCHAR(50),
 @StateIDs INT,
 @DateFrom NVARCHAR(20),
 @DateTo   NVARCHAR(20),
 @AddedBy NVARCHAR(250),
 @RoleID nvarchar(250),
 @SiteID int
 --@TotalRow int Out
 
 --@UserName nvarchar(250)
AS

    BEGIN
	--DECLARE @RoleID nvarchar(250)
	--SET @RoleID='69A340A4-5B55-475E-8447-4C552F867F00' 
	DECLARE @CatXML xml=cast(@CategoryIDs as xml)
	
	DECLARE @EditorUserId uniqueidentifier
	DECLARE @AddedByUserId uniqueidentifier
	SELECT @EditorUserId=UserID from aspnet_Users where Username=@Editor
	SELECT @AddedByUserId=UserID from aspnet_Users where Username=@AddedBy

	DECLARE @AllowState Table(
     stateID INT
   );
    INSERT INTO @AllowState
    SELECT DISTINCT
	StateID 
	FROM   [AdminCommon_Workflow] 
	UNPIVOT
	(StateID FOR I IN ( InputState, OutputState) ) unpiv
	 WHERE RoleID=@RoleID


	
        SET NOCOUNT ON; 
        SELECT  


		        A.ArticleID ,
				A.IsCustomReport,
				A.CustomReport,
                AC.CategoryID ,
                AC.CategoryName ,
                AAM.ArticleAuthorID ,
                AAM.UserID ,
				AU.FirstName +'#'+AU.LastName AS Author,
                A.Title ,
                A.Location ,
                A.AddedOn ,
                A.StateID ,
				AST.[StateClass],				
                AST.[State] ,                              
                A.ArticleEntryType ,
                AET.EntryType ,
				A.AddedBy,
                A.AssignTo,
				AUEditor.FirstName +'#'+AUEditor.LastName AS Editor
        INTO    #temp
        FROM    dbo.Article AS A
		Inner Join @AllowState ALWS 
				ON ALWS.stateID=A.StateID
        LEFT JOIN dbo.Article_CategoryMapping AS ACM
                ON ACM.ArticleID = A.ArticleID
        LEFT JOIN dbo.Article_Category AS AC
                ON AC.CategoryID = ACM.CategoryID
        LEFT JOIN dbo.Article_AuthorMapping AS AAM
                ON AAM.ArticleID = A.ArticleID
	    LEFT JOIN aspnet_Users AU
				ON AU.UserID=AAM.UserID
        LEFT JOIN dbo.Article_State AS AST
                ON A.StateID = AST.StateID        
        LEFT JOIN dbo.Article_EntryFormType AET
                ON AET.EntryTypeID = A.ArticleEntryType
		LEFT JOIN aspnet_Users AUEditor
				ON AUEditor.Username=A.AssignTo
		--LEFT JOIN aspnet_Users AUAddedBy
		--		ON AUAddedBy.Username=A.AddedBy

				
			WHERE 		    
			(@StateIDS=0 OR A.StateID=@StateIDs)
			AND
			(@DateFrom='' OR A.AddedOn>=@DateFrom)
			 AND
			(@DateTo='' OR A.AddedOn<=@DateTo)
			
			
			AND
			(@Keywords='' OR A.Title LIKE '%'+@Keywords+'%')
			AND (@Location='' OR A.Location=@Location)			
			--AND (@Reporter='' OR AU.UserID LIKE @Reporter)
			--AND (@Editor='' OR AU.UserID LIKE @Editor)
			AND (@Editor='' OR AUEditor.UserID LIKE @EditorUserId)
			--AND (@AddedBy='' OR AU.UserID like @AddedByUserId)
			AND (@AddedBy='' OR A.AddedBy LIKE @AddedBy)
			AND(
			@CategoryIDs='' 
			OR 
			ACM.CategoryID 
				IN(
				  SELECT
				  N.value('(./text())[1]', 'int') AS CatID   
				  FROM @CatXML.nodes('/category/catid') AS T(N)
				)
			)
			AND (@SiteID=0 OR A.SiteID=@SiteID)

   SELECT
   
   DISTINCT     --ROW_NUMBER() OVER(ORDER BY t2.ArticleID DESC) AS RowNum,
             
                T2.ArticleID ,
				T2.Title,
                T2.[State] ,
                T2.StateID ,
				T2.StateClass,
				T2.IsCustomReport,
				T2.CustomReport,             
                T2.ArticleEntryType ,
                T2.EntryType ,
                T2.AssignTo ,			
				T2.AddedBy,
                T2.AddedOn ,
				T2.Editor,
				--(SELECT DISTINCT T.Editor from #temp as T where T.ArticleID=T2.ArticleID
				--	GROUP BY T.ArticleID ,
    --                            T.UserID,
				--				t.Editor) As Editor,
                STUFF(( SELECT DISTINCT
                                ', ' + T.CategoryName
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.CategoryName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryName ,
                STUFF(( SELECT DISTINCT
                                ', ' + T.Author
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.UserID,
								t.Author
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS Author 
           into #temporary       
        FROM    #temp AS T2			
        GROUP BY T2.ArticleID ,
				T2.Title,
                T2.ArticleEntryType ,
				T2.IsCustomReport,
				T2.CustomReport,
                T2.CategoryName ,
                T2.UserID ,
                T2.[State] ,
                T2.StateID ,
				T2.StateClass,                
                T2.ArticleEntryType ,
                T2.EntryType ,
                T2.AssignTo ,
				T2.Editor,
				T2.AddedBy,
                T2.AddedOn
        ORDER BY T2.ArticleID DESC ,
                CategoryName ,
                T2.[State] ,
                T2.StateID ,                
                T2.ArticleEntryType ,
                T2.EntryType ,
                T2.AssignTo ,
                T2.AddedOn
           


		SELECT 
		 COUNT(ArticleID) OVER() AS TotalRow,
		-- ROW_NUMBER() OVER (ORDER BY ArticleID asc ) AS RowNum,
		* from #temporary
		ORDER BY ArticleID DESC 
		OFFSET @OffSet ROWS
	 	FETCH NEXT @Limit ROWS ONLY
        DROP TABLE #temp;
		drop table #temporary;
    END;

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetAllUsers]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetAllUsers]
	(
	@pageNumber int,
	@pageSize int
	)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @totalRowCount int
	SELECT @totalRowCount = COUNT(*) FROM [Aspnet_Users] 
	WHERE IsDeleted = 0 AND (dbo.[Aspnet_Users].UserID!='76F4944E-8928-4056-8E89-09EB994DDCEC' AND dbo.[Aspnet_Users].UserID!='ED8D72D1-E880-4B2A-9B80-858ACB6DB56A' AND dbo.[Aspnet_Users].UserID!='89D93C1E-19F8-4C0D-82FD-B15B8DB884BB');
	WITH userList AS (
		SELECT ROW_NUMBER() OVER(ORDER BY dbo.[Aspnet_Users].Aspnet_UserID DESC) AS RowNumber, 
		@totalRowCount as RowsCount, * FROM dbo.[Aspnet_Users] 
		WHERE dbo.[Aspnet_Users].IsDeleted=0 AND (dbo.[Aspnet_Users].UserID!='76F4944E-8928-4056-8E89-09EB994DDCEC' AND dbo.[Aspnet_Users].UserID!='ED8D72D1-E880-4B2A-9B80-858ACB6DB56A' AND dbo.[Aspnet_Users].UserID!='89D93C1E-19F8-4C0D-82FD-B15B8DB884BB'))
	
	SELECT * FROM userList WHERE RowNumber >=(@pageNumber-1)*@pageSize+1 
	AND RowNumber <=(@pageSize*@pageNumber)
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetArticleAllForVerify]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: 11/28/2017
-- Description:	<Description,,>

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetArticleAllForVerify]
	@ArticleID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT Title,Summary,Detail,DetailsViewDOM FROM Article 
	WHERE ArticleID=@ArticleID
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetArticlEntryType]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- Author:		Aishwarya Shakya
-- Create date: <Create Date,,>
-- Description:	<Description,,>

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetArticlEntryType]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT EntryTypeID,EntryType From Article_EntryFormType
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetAuthorByRole]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Author:		Aishwarya Shakya
-- Create date: 11/13/2017
-- Description:	<Description,,>
CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetAuthorByRole]
	@RoleID uniqueidentifier
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
    select [FirstName],[LastName],AU.[UserID],Au.Username from aspnet_Users AU
	INNER JOIN aspnet_UsersInRoles AUR
	ON AU.UserID=AUR.UserId
	Inner JOIN aspnet_Roles AR	
	On AUR.RoleId=AR.RoleId
	where AR.RoleId=@RoleID
	--where AR.RoleId='69A340A4-5B55-475E-8447-4C552F867F00'
END



GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetCategoryAll]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Author:		Aishwarya Shakya
-- Create date: 11/10/2014
-- Description:	Get All Category List
CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetCategoryAll] 
	@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT [CategoryID]
		   ,[CategoryName]
		   ,[Icon]
		   ,[AddedOn]
		   ,[AddedBy]
		   ,[UpdatedOn]
		   ,[UpdatedBy]
		   ,[DeletedOn]
		   ,[DeletedBy]
		   ,[IsBlog]
		   
		   FROM [dbo].[Article_Category]
		   WHERE IsDeleted=0		   
				AND SiteID=@SiteID
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetDataByIDVersion]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>
CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetDataByIDVersion] 
	@ArticleID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

   select Title,Summary,DetailsViewDOM from Article where ArticleID=@ArticleID
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetEditorByRole]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetEditorByRole]
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    select [FirstName],[LastName],AU.[UserID],Username from aspnet_Users AU
	INNER JOIN aspnet_UsersInRoles AUR
	ON AU.UserID=AUR.UserId
	Inner JOIN aspnet_Roles AR	
	On AUR.RoleId=AR.RoleId
	where AR.RoleId='521832A1-52F1-432C-8CF1-0CAEDEFC6BA4'
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetUserByUsername]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,>
CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetUserByUsername]
	@Username nvarchar(250)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    SELECT * FROM aspnet_Users where Username=@Username
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Reporter_GetUserDetByID]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_Reporter_GetUserDetByID]
	(
		@userID uniqueidentifier
	)
AS
BEGIN
	SELECT dbo.aspnet_Users.UserID, dbo.aspnet_Users.Username, dbo.aspnet_Users.Email, dbo.aspnet_Users.FirstName, dbo.aspnet_Users.LastName, dbo.aspnet_UsersInRoles.RoleId, dbo.aspnet_Roles.RoleName AS [RoleNames]
	 FROM dbo.aspnet_Users
	 INNER JOIN dbo.aspnet_UsersInRoles ON dbo.aspnet_Users.UserID = dbo.aspnet_UsersInRoles.UserId
	 INNER JOIN dbo.aspnet_Roles ON dbo.aspnet_UsersInRoles.RoleId = dbo.aspnet_Roles.RoleId
	  WHERE dbo.aspnet_Users.UserID = @userID;
END


GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Role_PortalRoleList]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/11/2017 9:47:42 AM
-- Description:	Get all roles.
-- ---------------------------------------------

CREATE PROCEDURE [dbo].[usp_Article_Role_PortalRoleList]
(
	@PortalID INT,
	@UserName NVARCHAR(256),
	@pageNumber int,
	@pageSize int
)
WITH EXECUTE AS CALLER
AS
BEGIN 
	SET NOCOUNT ON ;

	
	SELECT
		COUNT( PR.PortalRoleID ) OVER()  AS RowsCount,
		PR.[PortalRoleID],
		PR.[RoleID],
		R.RoleName,
		PR.[IsActive]
		
		FROM [dbo].[PortalRole] PR
		LEFT JOIN [dbo].[Aspnet_roles] R ON R.RoleId = PR.RoleID
		WHERE (PR.[PortalID]=@PortalID)
		ORDER BY PR.PortalRoleID
		OFFSET(@pageNumber) ROWS
		FETCH NEXT @pageSize ROWS ONLY 
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_RoleManagement_UpdateRoleStatus]    Script Date: 1/22/2018 4:52:37 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ----------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/05/2017
-- Description:	Update role status and inactive users on role when role is deactivated.
-- ----------------------------------------------

CREATE PROC [dbo].[usp_Article_RoleManagement_UpdateRoleStatus]
@RoleID UNIQUEIDENTIFIER,
@RoleStatus BIT
AS
BEGIN
	BEGIN TRANSACTION;
	SAVE TRANSACTION MySavePoint;

		BEGIN TRY

			UPDATE  dbo.PortalRole 
			SET
				IsActive = @RoleStatus
				WHERE RoleID =@RoleID;

			 ---- all users in current role. -----
			DECLARE @TempAllUserOnRole TABLE(
				UserID UNIQUEIDENTIFIER
			)

			---- All users who is active in other roles ----
			DECLARE @TempUsersOnActive TABLE(
				UserID UNIQUEIDENTIFIER
			)

			---- Get all the users in current role ----
			INSERT INTO @TempAllUserOnRole
			SELECT U.UserID FROM aspnet_Users U
			INNER JOIN aspnet_UsersInRoles UR ON U.UserID = UR.UserId 
			WHERE RoleID = @RoleID


			---- Get all the users who are active in other then this role ----
			INSERT INTO @TempUsersOnActive
			SELECT DISTINCT TAU.UserID from @TempAllUserOnRole TAU
			INNER JOIN aspnet_UsersInRoles UR ON TAU.UserID = UR.UserId
			INNER JOIN PortalRole PR ON PR.RoleId = UR.RoleId AND PR.IsActive = 1

			---- Get all the users who are active in other then this role from @TempAllUserOnRole table i.e. users who are active on only this role. ----
			DELETE t1
			FROM @TempAllUserOnRole t1
			JOIN @TempUsersOnActive t2 on T1.UserID = t2.UserID

			---- Inactivate those users who are active on only this role. ----
				UPDATE aspnet_Users
					SET
					IsActive = 0
					WHERE UserID IN (SELECT UserID FROM @TempAllUserOnRole) ;

				UPDATE aspnet_membership
					SET
					isapproved = 0
					WHERE UserId IN (SELECT UserID FROM @TempAllUserOnRole) ;

		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
				BEGIN
					ROLLBACK TRANSACTION MySavePoint;
				END
		END CATCH
	COMMIT TRANSACTION
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Subscribe_AddUpdate]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_Subscribe_AddUpdate]
(
@SubscribeUserID int,
@UserEmail nvarchar(50),
@IpAddress nvarchar(500),
@CatergoryIDs nvarchar(256),
@SiteID int,
@IsActive bit,
@PageName nvarchar(50),
@status INT OUT
) 
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @IntLocation int, @CategoryID int, @UserEmails nvarchar(50);
	SELECT @UserEmails = COUNT(UserEmail) FROM [Article_Subscribe] WHERE UserEmail = @UserEmail;
	IF @UserEmails = 0
	BEGIN
	IF @SubscribeUserID = 0
		BEGIN
		INSERT INTO [dbo].[Article_Subscribe]
           ([UserEmail]
           ,[IpAddress]
           ,[AddedOn],
		   [SiteID],
		   [IsActive],
		   [SubscribeID],
		   [PageName])
     VALUES
           (@UserEmail, @IpAddress, GETDATE(),@SiteID,@IsActive,NEWID(),@PageName);
		   SET @SubscribeUserID=SCOPE_IDENTITY()

		WHILE (CHARINDEX(',',    @CatergoryIDs, 1) > 0)
        BEGIN
              SET @IntLocation =   CHARINDEX(',',    @CatergoryIDs, 0)      
              INSERT INTO   Article_Subscribe_CatMap (CategoryID, SubscribeUserID, SiteID)
              --LTRIM and RTRIM to ensure blank spaces are   removed
              SELECT RTRIM(LTRIM(SUBSTRING(@CatergoryIDs,   0, @IntLocation))),@SubscribeUserID,@SiteID
              SET @CatergoryIDs = STUFF(@CatergoryIDs,   1, @IntLocation,   '') 
        END
		END
	ELSE
		BEGIN
		UPDATE [dbo].[Article_Subscribe]
		SET [UserEmail] = @UserEmail,
            [IpAddress] = @IpAddress 
		WHERE [SubscribeUserID] = @SubscribeUserID;

				create table #temp(SubscribeUserID int,CategoryID int)
		WHILE (CHARINDEX(',',    @CatergoryIDs, 1) > 0)
        BEGIN
              SET @IntLocation =   CHARINDEX(',',    @CatergoryIDs, 0)      
			  SET @CategoryID=RTRIM(LTRIM(SUBSTRING(@CatergoryIDs,   0, @IntLocation)))
			  
			  INSERT INTO #temp (SubscribeUserID,CategoryID) values(@SubscribeUserID,@CategoryID)
			  SET @CatergoryIDs = STUFF(@CatergoryIDs,   1, @IntLocation,   '') 
		END 	

			  	MERGE dbo.Article_Subscribe_CatMap AS Target
				USING #temp AS source	
				ON (Target.SubscribeUserID=SOURCE.SubscribeUserID AND Target.CategoryID=source.CategoryID)			
				WHEN MATCHED --AND Target.CategoryID<>source.CategoryID
				THEN 
				UPDATE SET Target.CategoryID=source.CategoryID
				WHEN NOT MATCHED BY TARGET THEN 
				INSERT (SubscribeUserID,CategoryID) VALUES(Source.SubscribeUserID,Source.CategoryID)
				WHEN NOT MATCHED BY SOURCE AND Target.SubscribeUserID=@SubscribeUserID THEN
				DELETE
				OUTPUT $action,
				Deleted.CategoryID AS CategoryTarget,
				Deleted.SubscribeUserID AS SubsTarget,
				Inserted.SubscribeUserID AS SubsSource,
				Inserted.CategoryID AS CategorySource;
				SELECT @@ROWCOUNT;             
              
			  drop table #temp
		END
		SET @status = 0;
	END
	ELSE
	BEGIN
	SET @status = 1;
	END
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Subscribe_Unsubscribe]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_Subscribe_Unsubscribe] 
(
@SubscribeID uniqueidentifier,
@status INT OUT
)
AS
BEGIN
	SET NOCOUNT ON;
	DECLARE @UserEmail nvarchar(50), @SubsID int;
	SELECT @UserEmail = COUNT(UserEmail) FROM [Article_Subscribe] WHERE IsActive = 0;
	SELECT @SubsID = COUNT(SubscribeID) FROM [Article_Subscribe] WHERE SubscribeID = @SubscribeID;
	IF @SubsID > 0
	BEGIN
	IF @UserEmail = 0
	BEGIN
	UPDATE Article_Subscribe SET IsActive = 0 WHERE SubscribeID = @SubscribeID;
	SET @status=0;
	END
	ELSE
	BEGIN
	SET @status=1;
	END
	END
	ELSE
	BEGIN
	SET @status=2;
	END
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_AddUpdate]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017
-- Description:	To Add Update Template of News/article Component.
-- 
CREATE PROCEDURE [dbo].[usp_Article_Template_AddUpdate]
	-- Add the parameters for the stored procedure here
 @TemplateID int
,@TemplateEditDOM nvarchar(max)
,@TemplateViewDom nvarchar(max)
,@DataReplaceFrameDom nvarchar(max)
,@AddedBy nvarchar(50)
,@IsBlog bit
,@IsSummary bit	
,@Title nvarchar(250)
,@CategoryID	int
,@LayoutType nvarchar(20)
,@OpStatus int out
,@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
IF @IsSummary=0
 SET @LayoutType=''
IF(@TemplateID=0)
BEGIN
 INSERT INTO [dbo].[Article_Template]
           ([TemplateEditDOM]
           ,[TemplateViewDom]
           ,[AddedBy]
           ,[AddedOn]
           ,[CategoryID]
		   ,[Title]
           ,[IsBlog]
           ,[IsSummary]
		   ,[LayoutType]
		   ,[DataReplaceFrameDom]
		   ,[SiteID])
     VALUES
           (@TemplateEditDOM,@TemplateViewDom,@AddedBy,GETUTCDATE(),@CategoryID,@Title,@IsBlog,@IsSummary,@LayoutType,@DataReplaceFrameDom,@SiteID)
		   set @OpStatus=@@IDENTITY
END
ELSE
	BEGIN
	UPDATE [dbo].[Article_Template]
	   SET [TemplateEditDOM] = @TemplateEditDOM
		  ,[TemplateViewDom] = @TemplateViewDom
		  ,[UpdatedBy] = @AddedBy
		  ,[UpdatedOn] = GETUTCDATE()
		  ,[CategoryID]=@CategoryID
		  ,[Title]=@Title
		  ,[LayoutType]=@LayoutType
		  ,[DataReplaceFrameDom]=@DataReplaceFrameDom
	 WHERE TemplateID=@TemplateID
	   set @OpStatus=@TemplateID
	END
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_Admin_GetAll]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017
-- Description:	To Get all Template of News/article Component.
-- 
CREATE PROCEDURE [dbo].[usp_Article_Template_Admin_GetAll]
	-- Add the parameters for the stored procedure here
 @IsBlog bit
,@IsSummary bit	
,@Title nvarchar(250)
,@CategoryName	nvarchar(250)
,@Offset int
,@Limit int
,@LayoutType nvarchar(20)
,@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

IF @CategoryName=''
 SET @CategoryName=NULL
IF @Title=''
 SET  @Title=NULL
SELECT
       ROW_NUMBER() OVER(ORDER BY TemplateID DESC) AS RowNum
       ,COUNT(TemplateID ) OVER()  AS RowTotal
      ,[TemplateID]
      ,[Title]
      ,ISNULL(AC.CategoryName,'')
      ,[TemplateViewDom]
      ,AT.[AddedBy]   
      ,[IsSummary]
	  ,IsSystemDefined
	  ,[DataReplaceFrameDom]
	  ,[TemplateEditDOM]
	  ,[LayoutType]
	  ,[IsDefault]
  FROM [dbo].[Article_Template] AT
  LEFT JOIN [dbo].[Article_Category] AC
  ON AT.CategoryID=AC.CategoryID
  WHERE 
  AT.IsDeleted=0
  AND (AT.SiteID=@SiteID OR AT.IsSystemDefined=1)
  AND AT.IsBlog=@IsBlog
  AND IsSummary=@IsSummary
  AND(@LayoutType='' OR LayoutType=@LayoutType)
  AND(@Title IS NULL OR AT.Title like '%'+@Title+'%')
  AND(@CategoryName IS NULL OR AC.CategoryName like '%'+@CategoryName+'%')
  ORDER BY
  TemplateID DESC
  OFFSET(@Offset) ROWS
  FETCH NEXT @Limit ROWS ONLY
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_DeleteByID]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017
-- Description:	To Get all Template of News/article Component by TemplateID.
-- EXEC [dbo].[usp_Article_Template_DeleteByID]  1,0
CREATE PROCEDURE [dbo].[usp_Article_Template_DeleteByID]
	-- Add the parameters for the stored procedure here
@TemplateID int,
@OpStatus int out
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
  
	 SELECT @OpStatus=IsSystemDefined from [dbo].[Article_Template]  WHERE TemplateID=TemplateID
  IF @OpStatus=0
  BEGIN
    UPDATE  [dbo].[Article_Template] 
	SET IsDeleted=1
    WHERE TemplateID=@TemplateID 
    SET @OpStatus=1
  END
  ELSE
  BEGIN
    SET @OpStatus=0
  END
 
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_GetAll]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017
-- Description:	To Get all Template of News/article Component.
-- 
CREATE PROCEDURE [dbo].[usp_Article_Template_GetAll]
	-- Add the parameters for the stored procedure here
 @IsBlog bit
,@IsSummary bit	
,@Title nvarchar(250)
,@CategoryName	nvarchar(250)
,@Offset int
,@Limit int
,@LayoutType nvarchar(20)
,@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

IF @CategoryName=''
 SET @CategoryName=NULL
IF @Title=''
 SET  @Title=NULL
SELECT
       ROW_NUMBER() OVER(ORDER BY TemplateID DESC) AS RowNum
       ,COUNT(TemplateID ) OVER()  AS RowTotal
      ,[TemplateID]
      ,[Title]
      ,ISNULL(AC.CategoryName,'')
      ,[TemplateViewDom]
      ,AT.[AddedBy]   
      ,[IsSummary]
	  ,IsSystemDefined
	  ,[DataReplaceFrameDom]
	  ,[LayoutType]
	  ,[IsDefault]
  FROM [dbo].[Article_Template] AT
  LEFT JOIN [dbo].[Article_Category] AC
  ON AT.CategoryID=AC.CategoryID
  WHERE 
  AT.IsDeleted=0
  AND AT.IsBlog=@IsBlog
  AND (AT.SiteID=@SiteID OR AT.IsSystemDefined=1)
  AND IsSummary=@IsSummary
  AND(@LayoutType='' OR LayoutType=@LayoutType)
  AND(@Title IS NULL OR AT.Title like '%'+@Title+'%')
  AND(@CategoryName IS NULL OR AC.CategoryName like '%'+@CategoryName+'%')
  ORDER BY
  TemplateID DESC
  OFFSET(@Offset) ROWS
  FETCH NEXT @Limit ROWS ONLY
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_GetByID]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017
-- Description:	To Get all Template of News/article Component by TemplateID.
-- exec [dbo].[usp_Article_Template_GetByID] 1
CREATE PROCEDURE [dbo].[usp_Article_Template_GetByID]
	-- Add the parameters for the stored procedure here
@TemplateID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

SELECT
       [TemplateID]
      ,[Title]
	  ,AT.[CategoryID]
      ,ISNULL(AC.CategoryName,'')
      ,[TemplateEditDOM]
      ,[TemplateViewDom]
	  ,[DataReplaceFrameDom]
      ,AT.[AddedBy]   
      ,[IsSummary]
	  ,[LayoutType]
	  ,[IsDefault]
  FROM [dbo].[Article_Template] AT
  LEFT JOIN [dbo].[Article_Category] AC
  ON AT.CategoryID=AC.CategoryID
  WHERE TemplateID=@TemplateID AND AT.IsDeleted=0
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_GETDefault]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017/11/24
-- Description:	To Get Default  Template of News/article Component.
-- exec [dbo].[usp_Article_Template_GetByID] 1
CREATE PROCEDURE [dbo].[usp_Article_Template_GETDefault]
	-- Add the parameters for the stored procedure here
@IsBlog bit
,@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
SELECT     
  [DataReplaceFrameDom]	 
  ,[TemplateEditDOM]
  FROM [dbo].[Article_Template] AT
  WHERE  [IsDefault]=1 AND IsBlog=@IsBlog AND IsSummary=0 AND (SiteID=@SiteID OR IsSystemDefined=1)
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_Template_SetDefaultByID]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain
-- Create date:2017
-- Description:	set template to default only one template of details or summary will be default template is default 
-- EXEC [dbo].[usp_Article_Template_SetDefaultByID] 8
CREATE PROCEDURE [dbo].[usp_Article_Template_SetDefaultByID]
	-- Add the parameters for the stored procedure here
@TemplateID int
,@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
DECLARE @IsSummary BIT
	SELECT @IsSummary=IsSummary from [dbo].[Article_Template]  WHERE TemplateID=@TemplateID 
     
    UPDATE  [dbo].[Article_Template] 
	SET IsDefault=0
    WHERE  IsSummary=@IsSummary AND (SiteID=@SiteID OR IsSystemDefined=1)
	
    UPDATE  [dbo].[Article_Template] 
	SET IsDefault=1
    WHERE  TemplateID=@TemplateID
   
    
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_User_GetRolesForUser]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_User_GetRolesForUser]	
AS
BEGIN
select
      AR.RoleId,
	  AR.RoleName
		from aspnet_Roles AR
		LEFT JOIN PortalRole PR ON AR.RoleId = PR.RoleID
		WHERE PR.IsActive = 1;
END



GO

/****** Object:  StoredProcedure [dbo].[usp_Article_User_GetUserDetByDateRange]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--EXEC [usp_Article_User_GetUserDetByDateRange] 0,10,'one','AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA','',''
CREATE PROCEDURE [dbo].[usp_Article_User_GetUserDetByDateRange]
	(
	@pageNumber int,
	@pageSize int,
	@searchTerm nvarchar(50),
	@role uniqueidentifier,
	@fromDate datetime,
	@toDate datetime
	)
AS
    BEGIN
        SET NOCOUNT ON;
	DECLARE @totalRowCount int;
	--DECLARE @CatXML xml=cast(@CategoryIDs as xml);
	SELECT @totalRowCount = COUNT(*) FROM dbo.aspnet_Membership;

        SELECT  AAB.Aspnet_UserID,
			    AAB.UserID ,
				AAR.RoleName,
                AAB.Username,                
                AAB.Email ,
                AAB.FirstName ,
                AAB.LastName ,
				AA.CreateDate,
				AAB.IsActive,
				AAPR.IsActive AS [RoleActive]
        INTO    #T
        FROM    aspnet_Membership AA
        LEFT JOIN aspnet_Users AAB
                ON AA.UserId = AAB.UserID
        LEFT JOIN aspnet_UsersInRoles AACM
                ON AAB.UserId = AACM.UserId
		LEFT JOIN PortalRole AAPR
                ON AACM.RoleId = AAPR.RoleID
		LEFT JOIN aspnet_Roles AAR
                ON AAPR.RoleId = AAR.RoleID
       
        WHERE   AAB.IsDeleted = 0 AND
	  (@searchTerm = '' OR AAB.Username LIKE @searchTerm + '%') AND
		  (@fromDate='' OR AA.CreateDate>=@fromDate) AND			 
			(@toDate='' OR AA.CreateDate<=@toDate) AND
	  (@role='AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA' OR AACM.RoleId = @role) AND
	    (AAB.UserID!='76F4944E-8928-4056-8E89-09EB994DDCEC' AND AAB.UserID!='ED8D72D1-E880-4B2A-9B80-858ACB6DB56A' AND AAB.UserID!='89D93C1E-19F8-4C0D-82FD-B15B8DB884BB')
	      AND (AAPR.IsActive = 1)

        SELECT	DISTINCT
				AAB.Aspnet_UserID,
				AAB.UserID ,
				 STUFF(( SELECT  ', ' + T.RoleName
                        FROM    #T AS T
                        WHERE   T.UserID = AAB.UserID
                        GROUP BY T.UserID ,
                                T.RoleName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS RoleName,
                AAB.Username,                
                AAB.Email ,
                AAB.FirstName ,
                AAB.LastName ,
				AAB.CreateDate ,
				AAB.IsActive,
				AAB.RoleActive AS [RoleActive]
        INTO    #userList
        FROM    #T AS AAB;	


        SELECT   COUNT(UserID) OVER() AS RowsCount, 
                ROW_NUMBER() OVER ( ORDER BY Aspnet_UserID DESC ) AS RowNumber ,
                *
        FROM #userList ORDER BY Aspnet_UserID DESC 
	   OFFSET (@pageNumber)   ROWS
		FETCH NEXT @pageSize ROWS ONLY;
        DROP TABLE #T,#userList;
    END;




GO

/****** Object:  StoredProcedure [dbo].[usp_Article_User_GetUserDetByUserID]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

--EXEC [usp_Article_User_GetUserDetByUserID] '4077DE1D-1CF8-4D6B-A700-79E7C433B7B8'
CREATE PROCEDURE [dbo].[usp_Article_User_GetUserDetByUserID]
	(
		@userID uniqueidentifier
	)
AS
BEGIN
	 SELECT 
				AAB.UserID ,
				AAB.Username,                
                AAB.Email ,
                AAB.FirstName ,
                AAB.LastName ,
				AACM.RoleId,
				AAR.RoleName AS [RoleNames]
        FROM     aspnet_Users AAB
        LEFT JOIN aspnet_UsersInRoles AACM
                ON AAB.UserId = AACM.UserId
		LEFT JOIN PortalRole AAPR
                ON AACM.RoleId = AAPR.RoleID
				   LEFT JOIN aspnet_Roles AAR
                ON AAPR.RoleId = AAR.RoleID
       
        WHERE   AAB.IsDeleted = 0 AND
		AAB.UserID = @userID	 
	       AND (AAPR.IsActive = 1)
END






GO

/****** Object:  StoredProcedure [dbo].[usp_Article_User_UpdateUserStatus]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[usp_Article_User_UpdateUserStatus]
	(
		@UserId uniqueidentifier,
	@UserName nvarchar(50),
	@status bit
		)
AS
BEGIN
	SET NOCOUNT ON;
	 BEGIN TRANSACTION
	 BEGIN TRY
	UPDATE aspnet_Users SET IsActive = @status, UpdatedBy = @UserName, UpdatedOn = GETDATE() WHERE UserID = @UserId;
	  UPDATE [dbo].[aspnet_Membership] SET IsApproved=@status WHERE UserId=@UserId;
	  COMMIT TRANSACTION
		   END TRY

BEGIN CATCH
  ROLLBACK TRANSACTION
END CATCH

END



GO

/****** Object:  StoredProcedure [dbo].[usp_Article_View_AddUpdateCommentCount]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ---------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/21/2017 11:47:40 AM
-- Description:	Add update the facebook comment count.
-- ---------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_View_AddUpdateCommentCount]
	@ArticleID INT,
	@SiteID INT,
	@CommentCount INT
AS
BEGIN
	SET NOCOUNT ON;
	IF EXISTS(SELECT ArticleID FROM Article_SocialComment WHERE ArticleID = @ArticleID AND SiteID = @SiteID)
		BEGIN
			UPDATE Article_SocialComment SET CommentCount = @CommentCount 
			WHERE ArticleID = @ArticleID AND SiteID = @SiteID
		END
	ELSE
		BEGIN
			INSERT INTO Article_SocialComment (ArticleID, CommentCount, SiteID)
			VALUES (@ArticleID, @CommentCount, @SiteID)
		END
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_View_GetAll]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>
--EXEC [dbo].[usp_Article_View_GetAll] 0,10,'0','','','0',0
-- =============================================
CREATE PROCEDURE [dbo].[usp_Article_View_GetAll]
 @OffSet INT, 
 @Limit INT,
 @CategoryIDs nvarchar(20),
 @Keywords nvarchar(250),
 @Location NVARCHAR(50),
 @ArticleTypeIDs nvarchar(50),
 @SiteID int
  
AS

    BEGIN
	--drop table #temp
	--select * from #temp where Image is not null 
        SET NOCOUNT ON; 
        SELECT  
				A.ArticleID ,
				A.Title,
				A.Summary,
				AU.FirstName +'#'+AU.LastName AS Author,
				A.Location,
				AU.[image],		        
                AC.CategoryID ,
                AC.CategoryName ,               
                AU.Username as UserName,
				AM.[FileName],
				AT.[ArticleTypes],
				AM.MediaTitle,
				A.IsCustomReport,
				A.CustomReport,				
				A.PublishDate			
				 
        INTO    #temp
        FROM    dbo.Article AS A
        LEFT JOIN dbo.Article_CategoryMapping AS ACM
                ON ACM.ArticleID = A.ArticleID
        LEFT JOIN dbo.Article_Category AS AC
                ON AC.CategoryID = ACM.CategoryID
        LEFT JOIN dbo.Article_AuthorMapping AS AAM
                ON AAM.ArticleID = A.ArticleID
		--LEFT JOIN aspnet_Users AUAdded
		--		ON AUAdded.Username=A.AddedBy
	    LEFT JOIN aspnet_Users AU
				ON AU.UserID=AAM.UserID
        LEFT JOIN dbo.Article_State AS AST
                ON A.StateID = AST.StateID  
		LEFT JOIN dbo.Article_Media AM
				ON AM.ArticleID=A.ArticleID	
		LEFT JOIN  [dbo].[Article_TypeArticleMapping] ATM
		        ON A.ArticleID=ATM.ArticleID
		LEFT JOIN  [dbo].[Article_Types] AT
		        ON ATM.ArticleTypeID=AT.ArticleTypeID				
				
		
			
			WHERE 	
			AM.IsForSummary=1
			AND A.StateID=9--test change to ( for Publish)
			AND
			(@Keywords='' OR A.Title=@Keywords)	    
		     AND
			(
				@CategoryIDs='0' OR ACM.CategoryID =@CategoryIDs
			)
			AND 
			(
			@ArticleTypeIDs='0'  OR  AT.ArticleTypeID =@ArticleTypeIDs
			)
			AND
			(A.SiteID=@SiteID)

   SELECT
   
   DISTINCT     --ROW_NUMBER() OVER(ORDER BY t2.ArticleID DESC) AS RowNum,
             
                T2.ArticleID ,
				T2.Title,  
				T2.Summary,				
				--T2.[image],
				T2.MediaTitle,
				T2.[FileName],							
				T2.PublishDate,	
				T2.IsCustomReport,	
				T2.CustomReport, 				
                STUFF(( SELECT DISTINCT
                                ', ' + T.CategoryName
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.CategoryName
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS CategoryName ,
				
	
                STUFF(( SELECT DISTINCT
                                ', ' + T.Author
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.UserName,
								t.Author
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS Author ,
				STUFF(( SELECT DISTINCT
                                ', ' + T.ArticleTypes
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY   T.ArticleID,
						           T.ArticleTypes
                        FOR
                        XML PATH('')
                      ), 1, 1, '') AS ArticleTypes,
				STUFF(( SELECT DISTINCT
                                ',' + CONVERT(varchar(MAX),T.UserName)
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY   T.ArticleID,
						           T.UserName 
								   
                        FOR
                        XML PATH('')
                      ), 1, 1, '') AS UserName,				

				STUFF(( SELECT 
                                ',' +ISNULL(NULLIF([image],''),'NoImage.png')
                        FROM    #temp AS T
                        WHERE   T.ArticleID = T2.ArticleID
                        GROUP BY T.ArticleID ,
                                T.UserName,
								t.[image]
                      FOR
                        XML PATH('')
                      ), 1, 1, '') AS AuthorImages 
					  
           into #temporary       
        FROM    #temp AS T2			
        GROUP BY T2.ArticleID ,
				T2.Title,                
                T2.CategoryName ,
                T2.UserName ,
				T2.Summary,
				T2.[image], 
				T2.MediaTitle,
				T2.[FileName],
				T2.Author,
				T2.IsCustomReport,				
				T2.CustomReport,				
				T2.PublishDate            
				
        ORDER BY T2.ArticleID DESC ,
				T2.PublishDate,				
				T2.[FileName]
           


		SELECT 
		 COUNT(ArticleID) OVER() AS TotalRow,
		-- ROW_NUMBER() OVER (ORDER BY ArticleID asc ) AS RowNum,
		* from #temporary
		ORDER BY ArticleID DESC 				
		OFFSET @OffSet ROWS
		FETCH NEXT @Limit ROWS ONLY
        DROP TABLE #temp;
		drop table #temporary;
    END;


GO

/****** Object:  StoredProcedure [dbo].[usp_Article_View_GetAllTemplate]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author:		Aishwarya Shakya
-- Create date: 2017
-- Description:	<Description,,>
--exec usp_Article_View_GetAllTemplate
-- =============================================
CREATE PROCEDURE [dbo].[usp_Article_View_GetAllTemplate] 
@LayoutType nvarchar(40),
@SiteID int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
    SELECT LayoutType,TemplateViewDom,DataReplaceFrameDom,Title,TemplateID FROM dbo.Article_Template
	WHERE IsSummary=1
	      AND IsDeleted=0 
		  AND LayoutType=@LayoutType
		  AND(SiteID=@SiteID OR IsSystemDefined=1)
END

GO

/****** Object:  StoredProcedure [dbo].[usp_Article_View_GetDetailsByID]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ----------------------------------------------
-- Author:		Kiran Shahi
-- Create date: 12/6/2017
-- Description:	Get Details View DOM by Article ID
-- ----------------------------------------------
CREATE PROCEDURE [dbo].[usp_Article_View_GetDetailsByID]
@ArticleID INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	SET NOCOUNT ON;
	SELECT DetailsViewDOM, PublishDate FROM Article WHERE ArticleID = @ArticleID AND StateID = 9
END

GO

/****** Object:  StoredProcedure [dbo].[usp_ArticleFilterValue]    Script Date: 1/22/2018 4:52:38 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- 
-- Author:		Rudra Chamlagain	
-- Create date: 2017
-- Description:	To get Filter value for filter news 
-- [dbo].[usp_ArticleFilterValue] 4,0,'910F0C31-E1DD-42D2-988B-545FE8621544',0
CREATE PROCEDURE [dbo].[usp_ArticleFilterValue]
	-- Add the parameters for the stored procedure here
@FilterFor INT, -- 0 FOR ALL (I.E article admin) 1 for reporter 2 for editor and 3 for publisher ,4 for admin
@IsBlog BIT,
@RoleID NVARCHAR(max),
@SiteID INT
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
	 DECLARE @AllowState Table(
     stateID INT
   );
    INSERT INTO @AllowState
    SELECT DISTINCT
	StateID 
	FROM   [AdminCommon_Workflow] 
	UNPIVOT
	(StateID FOR I IN ( InputState, OutputState) ) unpiv
	 WHERE RoleID=@RoleID OR @FilterFor=4

   SELECT 
       [CategoryID]
      ,[CategoryName]
      ,[Icon]
   FROM [dbo].[Article_Category]
   WHERE [IsDeleted]=0 AND [IsBlog]=0   AND SiteID=@SiteID

	SELECT DISTINCT [State],ST.[StateID],ST.IsActivityMessage FROM [dbo].[Article_State] ST
	INNER JOIN @AllowState AST 
	ON AST.stateID=ST.StateID OR @FilterFor=4
	

	   SELECT
	   [ArticleTypeID]
	  ,[ArticleTypes]    
	   FROM [dbo].[Article_Types]
	   WHERE 
	   (
	   @FilterFor!=1 
	   )
	   AND
	   [IsBlog]=@IsBlog   
	   AND
	   (SiteID=0  OR SiteID=@SiteID)
     
    -- GET ALL AUTHOR/REPORTER
     SELECT  au.[UserID],[FirstName],[LastName]  
	 FROM aspnet_Users AU
	 INNER JOIN aspnet_UsersInRoles AUR
	 ON AU.UserID=AUR.UserId
	 Inner JOIN aspnet_Roles AR	
	 ON AUR.RoleId=AR.RoleId 
	 WHERE
	 (@FilterFor!=1 )
	 AND
	  AR.RoleId='69A340A4-5B55-475E-8447-4C552F867F00' -- reporter roles

   
    -- GET ALL EDITOR
     SELECT [Username],[FirstName],[LastName]  
	 from aspnet_Users AU
	 INNER JOIN aspnet_UsersInRoles AUR
	 ON AU.UserID=AUR.UserId
	 Inner JOIN aspnet_Roles AR	
	 On AUR.RoleId=AR.RoleId 
	 WHERE
	 ( @FilterFor!=2)
	 AND
	 AR.RoleId='521832a1-52f1-432c-8cf1-0caedefc6ba4' -- editor roles
   
END

GO


/****** Object:  Table [dbo].[AdminCommon_Workflow]    Script Date: 1/19/2018 12:13:51 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[AdminCommon_Workflow](
	[WorkFID] [int] IDENTITY(1,1) NOT NULL,
	[RoleID] [uniqueidentifier] NULL,
	[InputState] [int] NULL,
	[OutputState] [int] NULL,
	[FlowEngineFor] [int] NULL,
	[AddedBy] [nvarchar](50) NULL,
	[AddedOn] [date] NULL,
	[UpdatedBy] [nvarchar](50) NULL,
	[UpdatedOn] [date] NULL,
	[DisplayOrder] [int] NULL,
	[IsReserved] [bit] NULL,
 CONSTRAINT [PK_AdminCommon_Workflow_new] PRIMARY KEY CLUSTERED 
(
	[WorkFID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO



/****** Object:  StoredProcedure [dbo].[usp_AdminCommon_Workflow_GetFlow]    Script Date: 1/22/2018 4:53:47 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

-- ------------------------------------
-- Author:		Rudra
-- Create date: 2017
-- Description:	To get First one work flow
-- --------------------------------------
-- EXEC [dbo].[usp_AdminCommon_Workflow_GetFlow] 'editor',1
CREATE PROCEDURE [dbo].[usp_AdminCommon_Workflow_GetFlow]
	-- Add the parameters for the stored procedure here
@RoleIDs	NVARCHAR(250),
@FlowEngineFor nvarchar(250)	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
    -- Insert statements for procedure here
 SELECT
       [InputState]
      ,[OutputState]
      ,[FlowEngineFor]
	  ,AST.ActionCssClass as CssClass
	  ,AST.TaskName
	  ,AST.ActionIcon
	  ,AST.IsActivityMessage
 FROM [dbo].[AdminCommon_Workflow] AFW
 INNER JOIN 
 [dbo].[aspnet_Roles] AR
 ON AFW.RoleID=AR.RoleId
 INNER JOIN Article_State AST
 ON AST.StateID=AFW.[OutputState]
 WHERE ar.RoleId in (select * from dbo.Split(@RoleIDs,','))
 AND FlowEngineFor=@FlowEngineFor
 order by DisplayOrder asc
END

GO






