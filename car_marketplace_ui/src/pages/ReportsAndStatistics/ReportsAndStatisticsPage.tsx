import React, {useEffect, useState} from 'react';
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, Tooltip, Typography} from '@mui/material';
import {getStatisticAsync} from "../../api/statisticsApi.ts";
import {IStatistic, ReportType, TimePeriod} from "../../types.ts";
import {getPopularCarsReportAsync, getSoldCarsReportAsync} from "../../api/reportsApi.ts";

const StatisticsPage: React.FC = () => {
    const [statistic, setStatistic] = useState<IStatistic | null>(null);
    const [timePeriod, setTimePeriod] = useState<TimePeriod>(TimePeriod.Today);

    useEffect(() => {
        fetchStatistic();
    }, []);

    const fetchStatistic = async () => {
        try {
            const data = await getStatisticAsync();
            setStatistic(data);
        } catch (error) {
            console.error("Error fetching statistic:", error);
        }
    };

    const handleDownloadReport = async (type: ReportType) => {
        try {
            let blob;

            if (ReportType.PopularCars) {
                blob = await getPopularCarsReportAsync(timePeriod)
            } else {
                blob = await getSoldCarsReportAsync(timePeriod);
            }

            if (blob instanceof Blob) {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${type}-${timePeriod.toString()}.xlsx`;
                link.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error("The response is not a Blob", blob);
            }
        } catch (error) {
            console.error("Error downloading report:", error);
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <Typography variant="h4" gutterBottom>Statistics</Typography>

            <Grid container spacing={2} style={{marginTop: '20px'}}>
                <Grid item xs={12} md={3}>
                    <div>
                        <Typography variant="h6">Active Sale Notices</Typography>
                        <Typography>{statistic?.activeSaleNoticesCount}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div>
                        <Typography variant="h6">Sold Cars</Typography>
                        <Typography>{statistic?.soldCarsCount}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div>
                        <Typography variant="h6">Active Users</Typography>
                        <Typography>{statistic?.activeUsersCount}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={3}>
                    <div>
                        <Typography variant="h6">The Most Popular Brand</Typography>
                        <Typography>{statistic?.popularBrand}</Typography>
                    </div>
                </Grid>
            </Grid>

            <FormControl style={{marginTop: '30px', width: '582px'}}>
                <InputLabel id="time-period-select-label">Time Period</InputLabel>
                <Tooltip title="Select the time period for the report" arrow>
                    <Select
                        labelId="time-period-select-label"
                        value={timePeriod}
                        onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
                        label="Time Period"
                    >
                        {Object.values(TimePeriod).map((period) => (
                            <MenuItem key={period} value={period}>
                                {period}
                            </MenuItem>
                        ))}
                    </Select>
                </Tooltip>
            </FormControl>

            <div style={{marginTop: '20px'}}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDownloadReport(ReportType.PopularCars)}
                    style={{marginRight: '10px'}}
                >
                    Download Popular Cars Report
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDownloadReport(ReportType.SoldCars)}
                >
                    Download Sold Cars Report
                </Button>
            </div>
        </div>
    );
};

export default StatisticsPage;
