import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
@Injectable()
export class DataService {

	constructor(private http: HttpClient) { }

	private buildHttpOptions(): any {
		return {
			headers: new HttpHeaders({
				gmail: decodeURIComponent(localStorage.getItem('gmail'))
			})
		};
	}

	private createBearerToken(): string {
		return `Bearer ${localStorage.getItem('googleoauth')}`;
	}

	private createUrl(url: string): string {
		return environment.baseApi + url;
	}

	/**
	 * Get google fit sync data
	 * @param url the api endpoint url to be called
	 */
	getSyncData(url: string) {
		return from(this.http.get(this.createUrl(url), this.buildHttpOptions()));
	}

	/**
	 * Get player steps score data
	 * @param url the api endpoint url to be called
	 */
	getPlayerScore(url: string) {
		return from(this.http.get(this.createUrl(url), this.buildHttpOptions()));
	}


	/**
	 * Get Team leaderboard values for male, female or individual
	 * @param url the api endpoint url to be called
	 */
	public getTeamsLeaderboardValues(url: string) {
		return from(this.http.get(this.createUrl(url)));
	}

	/**
 	* Get individual player scores
 	* @param url the api endpoint url to be called
 	*/
	public getIndividualPlayerScore(url: string) {
		return from(this.http.get(this.createUrl(url)));
	}

	/**
 	* Get Team leaderboard values for male, female or individual
 	* @param url the api endpoint url to be called
 	*/
	public getTeamList(url: string) {
		return from(this.http.get(this.createUrl(url)));
	}


	/**
	 * Add manual sync for player
	 * @param url the api endpoint url to be called
	 */
	public postManualSync(url: string, model: any) {
		return from(this.http.post(this.createUrl(url), model, {
			headers: new HttpHeaders({
				gmail: model.stepCounts.email
			})
		}));
	}

	public syncStepsData(url: string, requestBody: any) {
		return from(this.http.post(this.createUrl(url), requestBody, this.buildHttpOptions()));
	}

}
