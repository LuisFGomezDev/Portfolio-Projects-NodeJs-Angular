import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent implements OnInit
{
  public title: string;
  public subtitle: string;
  public web: string;
  public email: string;

  constructor()
  {
    this.title = "Luis Fernando Gomez";
    this.subtitle = "FullStack Developer & University Professor";
    this.web = "https://softwareengineer.it";
    this.email = "software.developerx64@gmail.com";

  }

  ngOnInit(): void 
  {
    
  }

}
