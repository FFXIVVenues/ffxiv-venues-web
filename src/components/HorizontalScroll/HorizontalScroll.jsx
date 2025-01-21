import React, { Component } from 'react';
import DOM from 'react-dom';
import { motion } from 'framer-motion';
import "./HorizontalScroll.css";

class HorizontalScroll extends Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return this.props.children !== nextProps.children;
  }

  scrollLeft() {
    const el = DOM.findDOMNode(this.hScrollParent);
    const stepValue = el.getBoundingClientRect().width * 0.88;
    this.scrollToX(el, el.scrollLeft - stepValue, 400);
  }

  scrollRight() {
    const el = DOM.findDOMNode(this.hScrollParent);
    const stepValue = el.getBoundingClientRect().width * 0.88;
    this.scrollToX(el, el.scrollLeft + stepValue, 400);
  }

  scrollToX(el, scrollTargetX, speed, easing) {
    let currentTime = 0;

    speed = speed || 2000;
    easing = easing || 'easeInOutSine';
    scrollTargetX = scrollTargetX || 0;

    // min time .1, max time .8 seconds
    let time = Math.max(.1, Math.min(Math.abs(el.scrollLeft - scrollTargetX) / speed, .8));

    // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
    let easingEquations = {
          easeOutSine: function (pos) {
            return Math.sin(pos * (Math.PI / 2));
          },
          easeInOutSine: function (pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
          },
          easeInOutQuint: function (pos) {
            if ((pos /= 0.5) < 1) {
              return 0.5 * Math.pow(pos, 5);
            }
            return 0.5 * (Math.pow((pos - 2), 5) + 2);
          }
        };

    function tick() {
      currentTime += 1 / 60;

      let p = currentTime / time;
      let t = easingEquations[easing](p);

      if (p < 1) {
        window.requestAnimationFrame(tick);
        el.scrollTo(el.scrollLeft + ((scrollTargetX - el.scrollLeft) * t), 0);
      } else {
        el.scrollTo(scrollTargetX, 0);
      }
    }
    window.requestAnimationFrame(tick);
  }

  render() {
    const { children } = this.props

    return (
      <div className={`scroll-horizontal ${this.props.className || ''}`}>
        <div onClick={this.scrollLeft.bind(this)} className='scroll-horizontal__arrow scroll-horizontal__arrow--left'></div>
        <div
          ref={r => { this.hScrollParent = r }}
          className='scroll-horizontal__scroll-parent'>
            <motion.div style={{ display: `inline-flex` }}>{children}</motion.div>
        </div>
        <div onClick={this.scrollRight.bind(this)} className='scroll-horizontal__arrow scroll-horizontal__arrow--right'></div>
      </div>
    )
  }
}

export { HorizontalScroll }

// todo: Try to replace all this with:
// https://www.codegrepper.com/code-examples/javascript/how+to+animate+scrollto+top