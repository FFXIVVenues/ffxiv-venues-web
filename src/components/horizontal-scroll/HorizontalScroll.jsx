import React, { Component } from 'react';
import DOM from 'react-dom';
import { Motion, spring, presets } from 'react-motion';
import "./horizontal-scroll.css";

class HorizontalScroll extends Component {
  constructor(props) {
    super(props)

    this.state = { animValues: 0 }

    this.onScrollStart = this.onScrollStart.bind(this)
    this.resetMin = this.resetMin.bind(this)
    this.resetMax = this.resetMax.bind(this)
  }

  componentDidMount() {
    // Place the 'lock__' class on the HTML element - if toggled
    if (this.props.pageLock) {
      const orig = document.firstElementChild.className
      document.firstElementChild.className = orig + (orig ? ' ' : '') + 'locked__'
    }

    DOM.findDOMNode(this.hScrollParent).addEventListener('wheel', this.onScrollStart, { passive: false })
  }

  componentWillUnmount() {
    if (this.props.pageLock) {
      document.firstElementChild.className = document.firstElementChild.className.replace(
        / ?locked__/,
        ''
      )
    }

    DOM.findDOMNode(this.hScrollParent).removeEventListener('wheel', this.onScrollStart)
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.animValues !== this.props.animValues) {
      this.setState({
        animValues: this.props.animValues
      }, this.calculate())
    } else {
      this.calculate()
    }
  }

  onScrollStart(e) {
    return;
    if (!e.shiftKey) return;
    e.preventDefault()
    // If scrolling on x axis, change to y axis. Otherwise, just get the y deltas.
    // (Basically, this for Apple mice that allow horizontal scrolling by default)
    var rawData = e.deltaY ? e.deltaY : e.deltaX
    var mouseY = Math.floor(rawData)

    // Bring in the existing animation values
    var animationValue = this.state.animValues
    var newAnimationValue = animationValue + mouseY
    var newAnimationValueNegative = animationValue - mouseY

    if (!this.caniscroll()) {
      return
    }

    var scrolling = () => {
      this.props.reverseScroll
        ? this.setState({ animValues: newAnimationValueNegative })
        : this.setState({ animValues: newAnimationValue })
    }

    // Begin Scrolling Animation
    window.requestAnimationFrame(scrolling)
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      true &&
      // Ensure component has been loaded
      this.calculate.timer !== void 0 &&
      this.props.children === nextProps.children &&
      this.state.animValues === nextState.animValues &&
      this.props.animValues === nextProps.animValues
    ) {
      return false
    }

    if (true && this.props.children === nextProps.children && this.caniscroll() === false) {
      return false
    }

    return true
  }

  caniscroll() {
    let el = DOM.findDOMNode(this.hScrollParent)
    let rect
    let scroller

    if (el) {
      rect = el.getBoundingClientRect()
      scroller = el.firstElementChild
    }

    return (
      scroller.offsetLeft < el.offsetLeft || scroller.offsetLeft + scroller.offsetWidth > rect.width
    )
  }

  calculate() {
    // Cancel the previous calculate
    clearTimeout(this.calculate.timer)

    // Lazy to calculate, prevent max recurse call
    this.calculate.timer = setTimeout(() => {
      // Calculate the bounds of the scroll area
      try {
        let el = DOM.findDOMNode(this.hScrollParent);
        let rect, max, win;

        if (el) {
          rect = el.getBoundingClientRect();
          max = el.lastElementChild.scrollWidth;
          win = el.offsetWidth;
        }
  
        // Get the new animation values
        var curr = this.state.animValues;
  
        // Establish the bounds. We do this every time b/c it might change.
        var bounds = -(max - win);
  
        // Logic to hold everything in place
        if (curr >= 1) {
          this.resetMin();
        } else if (curr <= bounds) {
          if (max > rect.width) {
            var x = bounds + 1;
            this.resetMax(x);
          } else {
            this.resetMax(0);
          }
        }
      } catch (error) {
        console.log('ERROR FROM REACT-SCROLL-HORIZONTAL ON getBoundingClientRect()', error)
      }
    })
  }

  moveLeft() {
    const el = DOM.findDOMNode(this.hScrollParent);
    const stepValue = el.firstChild.firstChild.getBoundingClientRect().width;
    const rect = el.getBoundingClientRect();

    const animationValue = this.state.animValues;
    const newAnimationValue = animationValue + Math.max(Math.floor(rect.width / stepValue), 1)*stepValue;

    if (!this.caniscroll()) {
      return;
    }

    window.requestAnimationFrame(() => { this.setState({ animValues: newAnimationValue }) })
  }

  moveRight() {
    const el = DOM.findDOMNode(this.hScrollParent);
    const stepValue = el.firstChild.firstChild.getBoundingClientRect().width;
    const rect = el.getBoundingClientRect();

    var animationValue = this.state.animValues;
    var newAnimationValue = animationValue - Math.max(Math.floor(rect.width / stepValue), 1)*stepValue;

    if (!this.caniscroll()) {
      return;
    }

    window.requestAnimationFrame(() => { this.setState({ animValues: newAnimationValue }) })
  }

  resetMin() {
    this.setState({ animValues: 0 })
  }

  resetMax(x) {
    this.setState({ animValues: x })
  }

  render() {
    const { config, style, children } = this.props
    const { width, height } = style || {}
    const springConfig = config || presets.noWobble

    // Styles
    const containerStyles= {
      height: height || `100%`,
      width: width || `100%`,
    };

    return (
      <div className={`scroll-horizontal ${this.props.className || ''}`} style={containerStyles}>
        <div onClick={this.moveLeft.bind(this)} className='scroll-horizontal__arrow scroll-horizontal__arrow--left'></div>
        <div
          ref={r => { this.hScrollParent = r }}
          style={style}
          className='scroll-horizontal__scroll-parent'>
          <Motion style={{ z: spring(this.state.animValues, springConfig) }}>
            {({ z }) => {
              const scrollingElementStyles = {
                transform: `translate3d(${z}px, 0,0)`,
                display: `inline-flex`,
                height: `100%`,
                position: `absolute`,
                willChange: `transform`
              }

              return <div style={scrollingElementStyles} id='horizontal-scroll'>{children}</div>
            }}
          </Motion>
        </div>
        <div onClick={this.moveRight.bind(this)} className='scroll-horizontal__arrow scroll-horizontal__arrow--right'></div>
      </div>
    )
  }
}

export { HorizontalScroll }

// todo: Try to replace all this with:
// https://www.codegrepper.com/code-examples/javascript/how+to+animate+scrollto+top