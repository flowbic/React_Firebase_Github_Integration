import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchReposDataGithubAPI, fetchOrgsDataGithubAPI, fetchReposInOrg } from '../../actions';
import { addWebhook } from '../../utils/helpers'
import _ from 'lodash';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListHeader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Styles
import styles from './OrgsList.style';

class RepoList extends React.Component {
	componentDidMount() {
		this.props.fetchOrgsDataGithubAPI();
	}

	viewReposInOrg = (name) => {
		let orgName = name;
		this.props.fetchReposInOrg(orgName);
	};

	addWebHOOK = (hookurl) => {
		addWebhook(hookurl);
	};

	renderOrgs = () => {
		this.props.fetchOrgsDataGithubAPI();
	};

	checkIfAdmin = (orgs, classes) => {
		if (orgs.repos_url) {
			return (
				<div>
					<Button onClick={() => this.viewReposInOrg(orgs.name)} variant="contained" className={classes.button}>
						View
					</Button>
				</div>
			);
		} else if (orgs.admin === true) {
			return (
				<Button onClick={this.addWebHOOK(orgs.hooks_url)} variant="contained" className={classes.button}>
					Subscribe
				</Button>
			);
		}
		else {
			return (
				<Button variant="contained" className={classes.button}>
					Not admin
				</Button>
			);
		}
	};

	checkIfAvatar = (orgs) => {
		if (orgs.avatarIMG) {
			return orgs.avatarIMG;
		} else {
			return orgs.avatar_url;
		}
	};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<GridList cellHeight={180} className={classes.gridList}>
					<GridListTile key="header" cols={2} style={{ height: 'auto' }}>
						<ListHeader component="div">
							<Typography className={classes.headerText} variant="overline" gutterBottom>
								Github Organizations
							</Typography>
						</ListHeader>
					</GridListTile>
					{this.props.orgs.map((orgs) => (
						<GridListTile key={orgs.name}>
							<img src={this.checkIfAvatar(orgs)} alt={'avatar'} />
							<GridListTileBar
								title={orgs.name}
								key={orgs.name}
								subtitle={<span> {orgs.url}</span>}
								actionIcon={this.checkIfAdmin(orgs, classes)}
							/>
						</GridListTile>
					))}
					<Button onClick={() => this.renderOrgs()} variant="contained" className={classes.backButton}>
						Back
					</Button>
				</GridList>
			</div>
		);
	}
}

RepoList.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	const orgs = _.map(state.orgs, (val) => {
		return { ...val };
	});

	return { orgs };
};

export default connect(mapStateToProps, {
	fetchReposDataGithubAPI,
	fetchOrgsDataGithubAPI,
	fetchReposInOrg
})(withStyles(styles)(RepoList));
