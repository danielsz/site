import { VNode } from '@cycle/dom'
import { AppState } from '../state'

import { style } from 'typestyle'
import * as csstips from 'csstips'
import { titleToAnchor } from '../helpers'
import { SponsorData, SponsorsData } from '../data/sponsors-data'
import Sponsor from './sponsor'

const container = style(csstips.horizontal, csstips.wrap, csstips.centerJustified, csstips.horizontallyCenterChildren, csstips.aroundJustified)

const add = (obj : { [index : string] : SponsorData[] }, sponsor : SponsorData) =>
    Object.assign({}, obj, {[sponsor.sponsorType]: [...(obj[sponsor.sponsorType] || []), sponsor]})
const sponsorGroups : { [index : string] : SponsorData[] } = SponsorsData.reduce((coll, sponsor) => add(coll, sponsor), {})

export default function sponsors(state : AppState) : VNode {
    return (
        <div id={titleToAnchor('Sponsors')}>
            <h1>Our Sponsors</h1>
            <h2>Partners</h2>
            <div className={container}>
                {sponsorGroups['Partner'].map((sponsor : SponsorData, i : number) => Sponsor(sponsor, i))}
            </div>
        </div>
    )
}