USE msdb
GO

IF EXISTS (SELECT
    job_id
  FROM msdb.dbo.sysjobs_view
  WHERE name = N'ManageTracker')
  EXEC msdb.dbo.sp_delete_job @job_name = N'ManageTracker',
                              @delete_unused_schedule = 1
GO
BEGIN
DECLARE @startTime int,
        @freqInterval int,
        @FreqType int,
        @Frequency nvarchar(20),
        @DatabaseName nvarchar(200)
DECLARE @job nvarchar(200),
        @Mycommand nvarchar(max),
        @startdate nvarchar(30),
        @serverName nvarchar(50)
SET @startTime = REPLACE(CAST(CONVERT(time(0), DATEADD(MINUTE, 5, GETDATE())) AS nvarchar(20)), ':', '')

SET @Frequency = N'Frequency' ---'Daily' or 'weekly' or 'Monthly' or 'Yearly'
SET @DatabaseName = N'DatabaseName' --'SageFrame'
SET @job = N'ManageTracker'  ---'Auto Job'
SET @Mycommand = N'INSERT INTO [dbo].[SessionTracker_arch1]
SELECT *
FROM [dbo].[SessionTracker] WHERE SessionTrackerID NOT IN (SELECT TOP 15 SessionTrackerID FROM SessionTracker ORDER BY SessionTrackerID DESC)   
DELETE FROM SessionTracker WHERE SessionTrackerID NOT IN (SELECT TOP 15 SessionTrackerID FROM SessionTracker ORDER BY SessionTrackerID DESC)'
SET @serverName = N'(Local)' --N'Server' --'(Local)'
SET @startdate = N'StartingDate' ---  '20160912'
SET @startdate = CONVERT(NVARCHAR, REPLACE(CONVERT(varchar(10), @startdate, 121), '-', ''))

IF @Frequency = 'Daily'
  SET @freqInterval = 1
ELSE
IF @Frequency = 'Weekly'
  SET @freqInterval = 7
ELSE
IF @Frequency = 'Monthly'
  SET @freqInterval = 30


  --SET @job = N'Manage Tracker'
EXEC dbo.sp_add_job @job_name = @job;
--Add a job step named process step. This step runs the stored procedure

EXEC sp_add_jobstep @job_name = @job,
                    @step_name = N'process step',
                    @subsystem = N'TSQL',
                    @command = @mycommand,
                    @database_name = @databaseName
--Schedule the job at a specified date and time
IF @Frequency = N'Yearly'
BEGIN
  EXEC sp_add_jobschedule @job_name = @job,
                          @name = N'MySchedule',
                          @freq_type = 16,
                          @active_start_date = @startdate,
                          @active_start_time = @starttime,
                          @freq_interval = 1,
                          @freq_recurrence_factor = 12
END
ELSE
BEGIN
  EXEC sp_add_jobschedule @job_name = @job,
                          @name = N'MySchedule',
                          @freq_type = 4,
                          @active_start_date = @startdate,
                          @active_start_time = @starttime,
                          @freq_interval = @freqInterval
END

-- Add the job to the SQL Server Server
EXEC dbo.sp_add_jobserver @job_name = @job,
                          @server_name = @servername
END
						  