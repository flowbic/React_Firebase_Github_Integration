import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addWebhook, deleteWebhook } from '../../utils/helpers'
import { deleteRepoFromSubscription } from '../../utils/firebaseDB'
import _ from 'lodash'

// Material-UI components
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListHeader from '@material-ui/core/ListSubheader'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Styles
import styles from './SubscriptionList.style';

class SubscriptionList extends React.Component {

	componentWillMount

	turnOffNotification = (subscription) => {
		deleteWebhook(subscription)
		deleteRepoFromSubscription(subscription)
	}

	turnOnNotification = (subscription) => {
		addWebhook(subscription)
	}

	renderButton = (subscription, classes) => {
		if (subscription.active) {
			return (
				<Button
					onClick={() => this.turnOffNotification(subscription)}
					variant="contained"
					className={classes.button}
				>
					Unsubscribe
				</Button>
			)
		} else {
			return (
				<Button
					onClick={() => this.turnOnNotification(subscription)}
					variant="outlined"
					className={classes.button}
				>
					Subscribe
				</Button>
			)
		}
	}

	checkIfSubscriptions = (subscription, classes) => {
		if (subscription.length === 0) {
			return (
				<Typography className={classes.headerText2} variant="overline" gutterBottom>
					You do not subscribe to any repository at the moment
				</Typography>
			)
		}
		return (
			<GridList cellHeight={180} className={classes.gridList}>
				<GridListTile key="header" cols={2} style={{ height: 'auto' }}>
					<ListHeader component="div">
						<div className={classes.hrContainer}>
							<Typography className={classes.headerText} variant="overline" gutterBottom>
								My Subscriptions
							<hr />
							</Typography>
						</div>
					</ListHeader>
				</GridListTile>
				{subscription.map((subscription) => (
					<GridListTile key={subscription.id}>
						<img src={subscription.avatarURL} alt={subscription.name} />
						<GridListTileBar
							title={subscription.name}
							subtitle={<span>owner: {subscription.owner}</span>}
							actionIcon={this.renderButton(subscription, classes)}
						/>
					</GridListTile>
				))}
			</GridList>
		)
	}

	render() {
		const { classes } = this.props
		return (
			<div className={classes.root}>
				{this.checkIfSubscriptions(this.props.subscription, classes)}
			</div>
		)
	}
}

SubscriptionList.propTypes = {
	classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	const subscription = _.map(state.subscription, (val) => {
		return { ...val }
	})

	return { subscription }
}

export default connect(mapStateToProps, {
})(withStyles(styles)(SubscriptionList))



