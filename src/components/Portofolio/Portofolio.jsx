import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { queryAPI } from '../../redux/actions/userActions';

class Portofolio extends Component {
	runQueryForTicker = async (e) => {
		e.preventDefault();
		await this.props.queryAPI(e.currentTarget.value);
	}

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
						<div className="search__container">
							{/* <div className="row">
								<form className="col s12">
									<div className="row">
										<div className="input-field col s12">
											<input id="email" type="email" className="validate" onKeyUp={this.runQueryForTicker}/>
											<label>Ticker Symbol</label>
											<span className="helper-text" data-error="wrong" data-success="right">Type ticker symbol</span>
										</div>
									</div>
								</form>
							</div> */}
							<div className="row">
								<div className="col s12">
									<div className="row">
										<div className="input-field col s12">
											<input type="text" id="autocomplete-input" className="autocomplete" onKeyUp={this.runQueryForTicker}/>
											<label htmlFor="autocomplete-input" >Search Ticker Symbol</label>
										</div>
									</div>
								</div>
							</div>
						</div>
						<br />
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

Portofolio.propTypes = {
	auth: PropTypes.object.isRequired,
	queryAPI: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	options: state.options,
	fetchingData: state.fetchingData
});

export default connect(
	mapStateToProps,
	{ queryAPI }
)(Portofolio);