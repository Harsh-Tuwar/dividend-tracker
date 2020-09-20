import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

const CardUI = (payload) => {
	return (
		<Card style={{ margin: '0 2%' }}>
			<CardContent>
				<Typography color="textSecondary" gutterBottom>INFECTED</Typography>
				<Typography variant="h5">$50,000</Typography>
				<Typography variant="body2">Number of Active Cases of COVID-19</Typography>
			</CardContent>
		</Card>
	);
}
 
export default Card;