import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-teams-list',
	templateUrl: './teams-list.component.html',
	styleUrls: ['./teams-list.component.less']
})
export class TeamsListComponent implements OnInit {
	@Input()
	teams: any;

	isMemberSelected: boolean;
	team: any;
	displayError: string ;
	constructor(
		private dataService: DataService,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.spinner.show();
		this.loadTeamsLeaderboard();
	}

	loadTeamsLeaderboard() {
		const topTeamsEndpoint = '/api/v1/leaderboard/topteams';
		this.dataService.getTeamsLeaderboardValues(topTeamsEndpoint)
			.subscribe(
				(teams: any) => {
					this.teams = teams;
					this.spinner.hide();
				},
				err =>{
					console.log(err);
					this.displayError = `Something went wrong.Don't worry! It's not your fault`
					this.spinner.hide();
				}
			);
	}

	getTeamList(team) {
		this.team = team;
		this.isMemberSelected = true;
	}

}
