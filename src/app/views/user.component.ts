import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DataService } from "../store/data.service";

// User: {"about":"Researcher in Computer Networks<p>https:&#x2F;&#x2F;www.iitis.pl&#x2F;~pjf&#x2F;\nhttps:&#x2F;&#x2F;twitter.com&#x2F;pforemski\nhttps:&#x2F;&#x2F;www.linkedin.com&#x2F;in&#x2F;pforemski","created":1201880179,"id":"pjf","karma":492,"submitted":[14298576,14250374,14245444,14166467,14093256,14045955,14031339,13939169,13894336,13894318,13875178,13856724,13828811,13819875,13773857,13773109,13728715,13664458,13605842,13510943,13480622,13461431,13305736,13245554,13245530,13227974,13142647,13137945,13114021,13005556,12969302,12963522,12876547,12835944,12762219,12761928,12759417,12742050,12721743,12691522,12682810,12617995,12615458,12612094,12611407,12535182,12531668,12518129,12517174,12514170,12397336,12389955,12359353,12267210,12186034,12165311,12120594,12120580,12113952,12048805,12000316,11985395,11974218,11973363,11937016,11915096,11909102,11909039,11851366,11760487,11541434,11351697,11265871,11238417,11124761,11033538,11033522,10935153,10669111,10636677,10636433,10632398,10620592,10613864,10586978,10566809,10559049,10552324,10533336,10518989,10498671,10491869,10351773,10170177,9819546,9760657,9380619,9380177,8855655,8855652,8818863,8657048,8274849,8267637,8166933,8163179,8147577,7783509,4762379,4547652,3570270,688719,474385,393115,390773,384965,325824,314747,313002,299637,291320,257743,157744,157742,154740,152515,152370,151094,143937,138228,135476,125588,125585,124672,117845,113252]}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  id: string;
  user: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => this.routeParamsChanged(params),
      error => this.handleError(error)
    );
  }

  get submissions() {
    return this.user.submitted ? this.user.submitted.length : 0;
  }
  
  get submittedUrl() {
    return `https://news.ycombinator.com/submitted?id=${this.user.id}`;
  }

  routeParamsChanged(params: {[key: string]: string}) {
    console.log(params.id);
    this.id = params.id;
    this.dataService.getUser(this.id)
      .then(user => this.user = user);
  }

  handleError(error: any) {
    throw new Error('Method not implemented.');
  }
}
