import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

class Portofolio extends Component {
	render() {
		const columns = [
			{
				name: "tickerSymbol",
				label: "Ticker Symbol",
				options: {
					filter: true,
					sort: true,
				}
			},
			{
				name: "company",
				label: "Company Name",
				options: {
					filter: true,
					sort: false,
				}
			},
			{
				name: "holdings",
				label: "Holdings",
				options: {
					filter: true,
					sort: false,
				}
			},
			{
				name: "div",
				label: "Dividend",
				options: {
					filter: true,
					sort: false,
				}
			},
		];



		const data = [
			{ tickerSymbol: "Joe James", company: "Test Corp", holdings: "Yonkers", div: "NY" },
			{ tickerSymbol: "John Walsh", company: "Test Corp", holdings: "Hartford", div: "CT" },
			{ tickerSymbol: "Bob Herm", company: "Test Corp", holdings: "Tampa", div: "FL" },
			{ tickerSymbol: "James Houston", company: "Test Corp", holdings: "Dallas", div: "TX" },
		];

		const options = {
			download: false,
			print: false,
			responsive: "standard",
			filterType: "checkbox"
		};

		return (
			<div className="container">
				<div className="row">
					<div className="col s12">
						<Link to="/dashboard" className="btn-flat waves-effect">
							<i className="material-icons left">keyboard_backspace</i>Back to Dashboard
						</Link>
						<div className="col s12" style={{ paddingLeft: "11.250px" }}>
							<h4>My <b>Portfolio</b></h4>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col s12">
						<div className="table__container">
							<MUIDataTable
								title={"Portfolio"}
								data={data}
								columns={columns}
								options={options}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Portofolio;