import { VNode } from '@cycle/dom'
import {possibleStates as EventAnimationStates } from '../state'
import { TeamMember } from '../data/team-data'
import * as csstips from 'csstips'

import { classes, style, keyframes } from 'typestyle'
import { baseFont, speechBubble } from '../style-helpers'

function eventAnimationStateToClass(state : EventAnimationStates) : string {
    const expandKeyframes = keyframes({
        '0%': {maxHeight: '0'},
        '100%': {maxHeight: '75em'}
    })

    const collapseKeyframes = keyframes({
        '100%': {maxHeight: '0em'},
        '0%': {maxHeight: '75em'}
    })

    const baseStyle = {
        fontSize: '0.85em',
        lineHeight: '1.4em',
        cursor: 'pointer'
    }

    const collapsedClass = style({
        textAlign: 'justify',
        height: '0',
        overflow: 'hidden'
    }, baseStyle)
    const expandingClass = style({
        textAlign: 'justify',
        maxHeight: '0',
        overflow: 'hidden',
        animationName: expandKeyframes,
        animationDuration: '0.5s',
        animationTimingFunction: 'cubic-bezier(1,0,1,0)'
    }, baseStyle)
    const expandedClass = style({
        textAlign: 'justify',
        maxHeight: '75em',
        overflow: 'hidden'
    }, baseStyle)
    const collapsingClass = style({
        textAlign: 'justify',
        maxHeight: '75em',
        overflow: 'hidden',
        animationName: collapseKeyframes,
        animationDuration: '0.5s',
        animationTimingFunction: 'cubic-bezier(0,1,0,1)'
    }, baseStyle)

    switch (state) {
        case 'collapsed':
            return collapsedClass
        case 'expanding':
            return expandingClass
        case 'collapsing':
            return collapsingClass
        case 'expanded':
            return expandedClass
        default:
            throw 'impossible state'
    }
}

export default function TeamMember(teamMember : TeamMember,
                                   teamMemberState : EventAnimationStates,
                                   index : number) : VNode {
    const teamMemberNameClass = style({
        cursor: 'pointer',
        display: 'inline-block'
    }, baseFont)

    const teamMemberImageClass = style({
        borderRadius: '50%',
        height: '150px',
        width: '150px',
        objectFit: 'cover',
        boxShadow: '0 0 0 3px #fff, 0 0 0 6px #000, 5px 4px 0 6px #000',
        cursor: 'pointer'
    }, speechBubble, {
        $nest: {
            '&::after': {
                content: `'X'`
            }
        }
    })

    const teamMemberClass = style({
        flexBasis: '28%',
        margin: '0.5rem',
        textDecoration: 'none',
        display: 'inline-block',
        $nest: {
            [`&:hover .${teamMemberNameClass}`]: {
                color: 'moccasin'
            },
            [`&:hover .${teamMemberImageClass}`]: {
                boxShadow: '0 0 0 3px moccasin, 0 0 0 6px #000, 5px 4px 0 6px #000'
            }
        }
    }, csstips.horizontal, csstips.aroundJustified, csstips.center)

    const teamMemberInfo = style(csstips.vertical)

    return (
        <a target='_blank' href={teamMember.linkedInUrl} className={classes('team-member', teamMemberClass)} data-teammemberindex={index.toString()}>
            <div className={teamMemberInfo}>
                <img className={teamMemberImageClass} src={teamMember.portrait}/>
                <p className={teamMemberNameClass}>{teamMember.name}</p>
            </div>
        </a>
    )
}
