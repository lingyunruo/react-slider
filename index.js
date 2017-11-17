import React, {Component} from 'react';

import './index.scss';

let timer = null;

class Slider extends Component {
	constructor(props) {
		super(props);

		this.state = {
			wrapperHeight: 0,
			wrapperWidth: '100%',
			currentIndex: 0,
			length: 0
		};

		this.getRelRec = this.getRelRec.bind(this);
		this.sliderMove = this.sliderMove.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.children && nextProps.children.length > 0) {
			this.setState({
				length: nextProps.children.length
			}, this.sliderMove);
		}
	}

	getRelRec(ref) {
		if(!ref) {
			return ;
		}
		let height = getComputedStyle(ref).height;
		let width = getComputedStyle(ref).width;

		this.setState({
			wrapperHeight: parseInt(height),
			wrapperWidth: parseInt(width)
		});
	}

	componentWillUnmount() {
		clearTimeout(timer);
	}

	sliderMove() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			if(this.state.length - 1 === this.state.currentIndex) {
				this.setState({
					currentIndex: 0
				});
			}
			else {
				this.setState({
					currentIndex: this.state.currentIndex + 1
				});
			}
			this.sliderMove();
		}, 6000);
	}


	render() {
		const {children} = this.props;
		const {wrapperWidth, currentIndex} = this.state;
		const contentWidth = children ? (wrapperWidth === '100%'?'100%':wrapperWidth * children.length) : '100%';

		return (
			<div
				className="slider-wrapper"
			    style={{
			    	height: this.state.wrapperHeight
			    }}
			>
				<div
					className="slider-content"
					style={{
						height: this.state.wrapperHeight,
						width: contentWidth,
						left: currentIndex * wrapperWidth * -1 || 0
					}}
				>
					{React.Children.map(children, (child, index) => {
						return (
							<div
								className="slider-item"
							    ref={this.getRelRec}
							    style={{
							    	width: this.state.wrapperWidth
							    }}
							>
								{child}
							</div>
						);
					})}
				</div>
				<div className="slider-navigator">
					{React.Children.map(children, (child, index) => {
						return (
							<span 
								className={`slider-navigator-item ${currentIndex === index?'active':''}`}
								key={index}
							>
							</span>
						)
					})}
				</div>
			</div>
		);
	}
}

export default Slider;