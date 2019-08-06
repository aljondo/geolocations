import React from 'react';
import { Card, CardBody, Container, Row, Col, Button} from 'reactstrap';

class GeoLocationCard extends React.Component {
	renderGeoInfo(gObj) {
		if(gObj.geoKey === "countries") {
			return (
				<p><strong>Name:</strong> {gObj.geoObject}</p>
			)
		}
		else {
			return (
				Object.keys(gObj.geoObject).map((k, i) => 
					<p key={i}><strong>{k}:</strong> {gObj.geoObject[k]}</p>
				)
			)
		}
	}

	render() {
		const { geoObj, removeCard } = this.props;
		return (
	    <div className="GeoCard">
	      <Card>
	        <CardBody>
	        	<Container>
	        		<Row>
	        			<Col md="5">
	        				{this.renderGeoInfo(geoObj)}
	        			</Col>
	        			<Col md="5">
	        				<p><strong>Occurences:</strong> {geoObj.sum}</p>
	          			<p><strong>Type:</strong> {geoObj.geoKey}</p>
	        			</Col>
	        			<Col md="2">
	        				<Button	
	        					color="danger"
	        					size="sm"
	        					onClick={() => removeCard(geoObj.key)}
	        				>
	        					Remove
	        				</Button>
	        			</Col>
	        		</Row>
	        	</Container>
	        </CardBody>
	      </Card>
	    </div>
	  )
	}
}

export default GeoLocationCard;