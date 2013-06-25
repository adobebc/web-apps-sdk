## Affiliate programs

*/layouts/affiliates/affiliate.html*

* `{tag_actiontotal,actionTypeId,days}` - Total number of actions for the last x days. For example, web form inquiries (2), purchase (3), and quote (4).
* `{tag_affiliatelink}` -	The link for this affiliate to use on their website or forward to friends for tracking purposes.
* `{tag_clickthrustotal}` -	Total click-throughs via the affiliate link
* `{tag_commissionowing}` -	Commission owing to the affiliate logged in to the secure zone
* `{tag_referralslastmonth}` -	Referrals made last month by the affiliate logged in to the secure zone
* `{tag_referralslastweek}` -	Referrals made last week by the affiliate logged in to the secure zone
* `{tag_referralstoday}` - Referrals made today by the affiliate logged in to the secure zone
* `{tag_referralstotal}` -	Total number of referrals the affiliate made logged in to the secure zone

## Default template

`<p>This is your personal Affiliate link <a href="{tag_affiliatelink}" target="_blank">{tag_affiliatelink}</a>. Place this link on your website or forward to friends. Whenever someone clicks on this link to visit this website they will be tagged and when they purchase you will earn commissions.</p>

  <p>Here are your latest Affiliate stats:</p>

	<table class="affiliate-stats" cellspacing="0">
		<tbody>                
			<tr><td class="var">Total Unique Click-Thrus:</td>
			<td class="val"><strong>{tag_clickthrustotal}</strong></td></tr>                
			<tr><td class="var">Total Referrals to date:</td>
			<td class="val"><strong>{tag_referralstotal}</strong></td></tr>
		<tr>
			<td class="var">Total Commission<br>Owing to you:</td>
			<td class="val"><strong>{tag_commissionowing}</strong></td>
		</tr>
		<tr>
			<td colspan="2">&nbsp;</td>
		</tr>
		<tr>
			<td class="var">Referrals Today:</td>
			<td class="val">{tag_referralstoday}</td></tr>
		<tr>
			<td class="var">Referrals This Week:</td>
			<td class="val">{tag_referralslastweek}</td></tr>
		<tr>
			<td class="var">Referrals This Month:</td>
			<td class="val">{tag_referralslastmonth}</td>
		</tr>
	</tbody></table>`
