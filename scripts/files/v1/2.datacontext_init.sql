CREATE TABLE [Boards] (
    [BoardID] int NOT NULL IDENTITY,
    [BoardName] nvarchar(max),
    CONSTRAINT [PK_Boards] PRIMARY KEY ([BoardID])
);
GO