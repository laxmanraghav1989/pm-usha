import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';
import Chart from 'chart.js/auto';
import { routes } from 'src/app/routes';
import { MasterService } from 'src/app/service/master.service';
import { Router } from '@angular/router';

Chart.defaults.datasets.bar.barThickness = 35;
@Component({
  selector: 'cfs-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public routers: typeof routes = routes;
  public chart: Chart;
  userTypeId: string;
  stateCount: number = 0;
  gpiRatio: number = 0;
  gerRatio: number = 0;
  focusDistCount: number = 0;
  population: number = 0;
  collegeCount: number = 0;
  universityCount: number = 0;
  ndmcCount: number = 0;
  meruCount: number = 0;
  equityCount: number = 0;
  strengthenCollegeCount: number = 0;
  strengthenUniversityCount: number = 0;
  stateOnBoard: number = 0;
  mouCount: number = 0;
  mmerCount: number = 0
  stateCode: string
  totalFinalSubmitMeru: number = 0;
  totalFinalSubmitUniv: number = 0;
  totalFinalSubmitClg: number = 0;
  totalFinalSubmitNMDC: number = 0;
  totalFinalSubmitGender: number = 0;
  totalApprovedMeru: number = 0;
  totalApprovedUniv: number = 0;
  totalApprovedClg: number = 0;
  totalApprovedNMDC: number = 0;
  totalApprovedGender: number = 0;
  totalPendingMeru: number = 0;
  totalPendingUniv: number = 0;
  totalPendingClg: number = 0;
  totalPendingNMDC: number = 0;
  totalPendingGender: number = 0;
  totalRejectMeru: number = 0;
  totalRejectUniv: number = 0;
  totalRejectClg: number = 0;
  totalRejectNMDC: number = 0;
  totalRejectGender: number = 0;
  componentList: Array<any> = []
  meruComponent: any;
  genderComponent: any;
  univComponent: any;
  clgComponent: any;
  nmdcComponent: any;
  totalApprovedMeruNPD: number = 0;
  totalRejectMeruNPD: number = 0;
  totalPendingMeruNPD: number = 0;
  totalApprovedUnivNPD: number = 0;
  totalRejectUnivNPD: number = 0;
  totalPendingUnivNPD: number = 0;
  totalApprovedClgNPD: number = 0;
  totalRejectClgNPD: number = 0;
  totalPendingClgNPD: number = 0;
  totalApprovedNMDCNPD: number = 0;
  totalRejectNMDCNPD: number = 0;
  totalPendingNMDCNPD: number = 0;
  totalApprovedGenderNPD: number = 0;
  totalRejectGenderNPD: number = 0;
  totalPendingGenderNPD: number = 0;
  meruTotalUser: number = 0;
  universityTotalUser: number = 0;
  collegeTotalUser: number = 0;
  ndmcTotalUser: number = 0;
  approvedMeruUser: number = 0;



  meruMappedUser: number = 0;
  universityMappedUser: number = 0;
  approvedUniversityUser: number = 0;
  collegeMappedUser: number = 0;
  disapprovedMeruUse: number = 0;
  approvedCollegeUser: number = 0;
  disapprovedUniversityUse: number = 0;
  disapprovedCollegeUse: number = 0;
  equityMappedUser: number = 0;
  nmdcMappedUser: number = 0;
  approvedNmdcUser: number = 0;
  disapprovedNmdcUse: number = 0;
  approvedEquityUser: number = 0;
  disapprovedEquityUser: number = 0;
  saaForwardedFinalProposalToNpdCount: number = 0

  equitTotalUser: number
  proposalList: Array<any> = []
  totalMeruReport: any
  totalUniReport: any;
  totalCollegeReport: any;
  totalNMDCReport: any;
  totalGenderReport: any;
  variables: Array<any> = [];
  stateList: Array<any> = []
  meruShemeAssignedToConsultant: number = 0;
  streUniShemeAssignedToConsultant: number = 0;
  collegeShemeAssignedToConsultant: number = 0;
  ndmcShemeAssignedToConsultant: number = 0;
  equityShemeAssignedToConsultant: number = 0;
  stateShemeAssignedToConsultant: number = 0;
  saaApprovedMeruCount: number = 0;
  meruIsSAAForwardedCount: number = 0;
  meruConsultantUserCount: number = 0;
  meruConsultantStatusCount: number = 0;
  saaApprovedStrengthenUniversityCount: number = 0;
  collegeIsSAAForwardedCount: number = 0;
  collegeConsultantUserCount: number = 0;
  universityConsultantStatusCount: number = 0;
  saaApprovedStrengthenCollegeCount: number = 0;
  universityIsSAAForwardedCount: number = 0;
  universityConsultantUserCount: number = 0;
  collegeConsultantStatusCount: number = 0;
  saaApprovedNdmcCount: number = 0;
  nmdcIsSAAForwardedCount: number = 0;
  nmdcConsultantUserCount: number = 0;
  nmdcConsultantStatusCount: number = 0;
  saaApprovedEquityCount: number = 0;
  equityIsSAAForwardedCount: number = 0;
  equityConsultantUserCount: number = 0;
  equityConsultantStatusCount: number = 0;
  
  constructor(public getService: GetService, public sharedService: SharedService, public masterService: MasterService, public router: Router) {
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.stateCode = sessionStorage.getItem('stateCode')

  }

  ngOnInit(): void {
    this.getComponentList();
    this.getDashBoard();
    // this.getFinalProposal()
    this.getStateData();
    this.getStateList();

    //  this.getFinalProposal()
  }

  getFinalProposal() {
    if (this.userTypeId === this.sharedService.userTypeList['0'].id|| this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id) {
      this.stateCode = ''
    }
    this.getService.getFinalProposalCount(this.stateCode).subscribe(res => {
      this.proposalList = res;

      this.totalMeruReport = this.proposalList.reduce((total, item) => {
        return total + Number(item.meruCount)
      }, 0)

      this.totalUniReport = this.proposalList.reduce((total, item) => {
        return total + Number(item.strengthUniversityCount)
      }, 0)

      this.totalCollegeReport = this.proposalList.reduce((total, item) => {
        return total + Number(item.collegeCount)
      }, 0)

      this.totalNMDCReport = this.proposalList.reduce((total, item) => {
        return total + Number(item.ndmcCount)
      }, 0)

      this.totalGenderReport = this.proposalList.reduce((total, item) => {
        return total + Number(item.equityCount)
      }, 0)



       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.componentList = res;
      this.meruComponent = this.componentList.find(ele => ele.id === this.sharedService.meruComponentId).componentName
      this.univComponent = this.componentList.find(ele => ele.id === this.sharedService.universityComponentId).componentName
      this.clgComponent = this.componentList.find(ele => ele.id === this.sharedService.collegeComponentId).componentName
      this.nmdcComponent = this.componentList.find(ele => ele.id === this.sharedService.nmdcComponentId).componentName
      this.genderComponent = this.componentList.find(ele => ele.id === this.sharedService.genderComponentId).componentName
      if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id|| this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id)
        this.getFinalSubmittedData();
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDashBoard() {
    if (this.userTypeId === this.sharedService.userTypeList['0'].id|| this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
      this.stateCode = 'ALL'
    }
    this.getService.getDashboard(this.stateCode).subscribe(res => {
      if (res !== null) {
        this.stateCount = res.stateCount,
          this.gpiRatio = res.gpiRatio,
          this.gerRatio = res.gerRatio,
          this.focusDistCount = res.focusDistCount,
          this.population = res.population,

          this.meruCount = res.meruCount,
          this.saaApprovedMeruCount = res.saaApprovedMeruCount,
          this.meruIsSAAForwardedCount = res.meruIsSAAForwardedCount,
          this.meruConsultantUserCount = res.meruConsultantUserCount,
          this.meruConsultantStatusCount = res.meruConsultantStatusCount

          this.universityCount = res.universityCount,
          this.strengthenUniversityCount = res.strengthenUniversityCount,
          this.saaApprovedStrengthenUniversityCount = res.saaApprovedStrengthenUniversityCount,
          this.universityIsSAAForwardedCount = res.universityIsSAAForwardedCount,
          this.universityConsultantUserCount = res.universityConsultantUserCount,
          this.universityConsultantStatusCount = res.universityConsultantStatusCount,
          
          this.collegeCount = res.collegeCount,
          this.strengthenCollegeCount = res.strengthenCollegeCount,
          this.saaApprovedStrengthenCollegeCount = res.saaApprovedStrengthenCollegeCount,
          this.collegeIsSAAForwardedCount = res.collegeIsSAAForwardedCount,
          this.collegeConsultantUserCount = res.collegeConsultantUserCount,
          this.collegeConsultantStatusCount = res.collegeConsultantStatusCount,

          this.ndmcCount = res.ndmcCount,
          this.saaApprovedNdmcCount = res.saaApprovedNdmcCount,
          this.nmdcIsSAAForwardedCount = res.nmdcIsSAAForwardedCount,
          this.nmdcConsultantUserCount = res.nmdcConsultantUserCount,
          this.nmdcConsultantStatusCount = res.nmdcConsultantStatusCount,
         
          this.equityCount = res.equityCount,
          this.saaApprovedEquityCount = res.saaApprovedEquityCount,
          this.equityIsSAAForwardedCount = res.equityIsSAAForwardedCount,
          this.equityConsultantUserCount = res.equityConsultantUserCount,
          this.equityConsultantStatusCount = res.equityConsultantStatusCount,
         
       
        
         
          this.stateOnBoard = res.stateOnBoard,
          this.mouCount = res.mouCount,
          this.mmerCount = res.mmerCount,
          this.saaForwardedFinalProposalToNpdCount = res.saaForwardedFinalProposalToNpdCount
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  getStateList() {
    this.masterService.getState().subscribe(res => {
      this.variables = res;
      this.stateList = this.variables.slice()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getStateData() {
    if (this.userTypeId === this.sharedService.userTypeList['0'].id||this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
      this.stateCode = 'ALL'
    }
    this.getService.getStateSubmitData(this.stateCode).subscribe(res => {
      this.meruTotalUser = res.meruTotalUser;
      this.meruMappedUser = res.meruMappedUser;
      this.disapprovedMeruUse = res.disapprovedMeruUse,
        this.approvedMeruUser = res.approvedMeruUser;

      this.universityTotalUser = res.universityTotalUser;
      this.universityMappedUser = res.universityMappedUser;
      this.approvedUniversityUser = res.approvedUniversityUser;
      this.disapprovedUniversityUse = res.disapprovedUniversityUse;

      this.collegeTotalUser = res.collegeTotalUser;
      this.collegeMappedUser = res.collegeMappedUser;
      this.approvedCollegeUser = res.approvedCollegeUser;
      this.disapprovedCollegeUse = res.disapprovedCollegeUse;

      this.equitTotalUser = res.equitTotalUser;
      this.equityMappedUser = res.equityMappedUser;
      this.approvedEquityUser = res.approvedEquityUser;
      this.disapprovedEquityUser = res.disapprovedEquityUser;


      this.ndmcTotalUser = res.ndmcTotalUser;
      this.nmdcMappedUser = res.nmdcMappedUser;
      this.approvedNmdcUser = res.approvedNmdcUser;
      this.disapprovedNmdcUse = res.disapprovedNmdcUse;

      this.meruShemeAssignedToConsultant = res.meruShemeAssignedToConsultant,
        this.streUniShemeAssignedToConsultant = res.streUniShemeAssignedToConsultant,
        this.collegeShemeAssignedToConsultant = res.collegeShemeAssignedToConsultant,
        this.ndmcShemeAssignedToConsultant = res.ndmcShemeAssignedToConsultant,
        this.equityShemeAssignedToConsultant = res.equityShemeAssignedToConsultant
      this.stateShemeAssignedToConsultant = res.stateShemeAssignedToConsultant

    }, error => {

    })
  }
  getFinalSubmittedData() {

    this.getService.getfinalSubmit(this.userTypeId === this.sharedService.userTypeList['0'].id  || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id ? null : this.stateCode, '').subscribe(res => {
      res.data.forEach(element => {
        if (this.sharedService.userTypeList['1'].id === this.userTypeId || this.userTypeId === this.sharedService.userTypeList['2'].id) {
          if (element.userTypeId?.toString() !== this.sharedService.userTypeList['1'].id) {
            if (element.componentId === this.sharedService.meruComponentId) {
              this.totalFinalSubmitMeru++;
              if (element.isSaaApproved) {
                this.totalApprovedMeru++
                if (element.isNpdApproved) {
                  this.totalApprovedMeruNPD++
                } if (element.isNpdApproved === false) {
                  this.totalRejectMeruNPD++
                } if (element.isNpdApproved === null) {
                  this.totalPendingMeruNPD++
                }
              } if (element.isSaaApproved === false) {
                this.totalRejectMeru++
              } if (element.isSaaApproved === null) {
                this.totalPendingMeru++
              }
            } if (element.componentId === this.sharedService.universityComponentId) {
              this.totalFinalSubmitUniv++;

              if (element.isSaaApproved) {
                this.totalApprovedUniv++
                if (element.isNpdApproved) {
                  this.totalApprovedUnivNPD++
                } if (element.isNpdApproved === false) {
                  this.totalRejectUnivNPD++
                } if (element.isNpdApproved === null) {
                  this.totalPendingUnivNPD++
                }
              } if (element.isSaaApproved === false) {
                this.totalRejectUniv++
              } if (element.isSaaApproved === null) {
                this.totalPendingUniv++
              }
            } if (element.componentId === this.sharedService.collegeComponentId) {
              this.totalFinalSubmitClg++;
              if (element.isSaaApproved) {
                this.totalApprovedClg++
                if (element.isNpdApproved) {
                  this.totalApprovedClgNPD++
                } if (element.isNpdApproved === false) {
                  this.totalRejectClgNPD++
                } if (element.isNpdApproved === null) {
                  this.totalPendingClgNPD++
                }
              } if (element.isSaaApproved === false) {
                this.totalRejectClg++
              } if (element.isSaaApproved === null) {
                this.totalPendingClg++
              }
            } if (element.componentId === this.sharedService.nmdcComponentId) {
              this.totalFinalSubmitNMDC++;
              if (element.isSaaApproved) {
                this.totalApprovedNMDC++
                if (element.isNpdApproved) {
                  this.totalApprovedNMDCNPD++
                } if (element.isNpdApproved === false) {
                  this.totalRejectNMDCNPD++
                } if (element.isNpdApproved === null) {
                  this.totalPendingNMDCNPD++
                }
              } if (element.isSaaApproved === false) {
                this.totalRejectNMDC++
              } if (element.isSaaApproved === null) {
                this.totalPendingNMDC++
              }
            } if (element.componentId === this.sharedService.genderComponentId) {
              this.totalFinalSubmitGender++;
              if (element.isSaaApproved) {
                this.totalApprovedGender++
                if (element.isNpdApproved) {
                  this.totalApprovedGenderNPD++
                } if (element.isNpdApproved === false) {
                  this.totalRejectGenderNPD++
                } if (element.isNpdApproved === null) {
                  this.totalPendingGenderNPD++
                }
              } if (element.isSaaApproved === false) {
                this.totalRejectGender++
              } if (element.isSaaApproved === null) {
                this.totalPendingGender++
              }
            }
          }
        }

        if (this.sharedService.userTypeList['0'].id === this.userTypeId|| this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id) {
          if (element.userTypeId?.toString() !== this.sharedService.userTypeList['1'].id) {
            if (element.componentId === this.sharedService.meruComponentId) {
              this.totalFinalSubmitMeru++;
              if (element.isNpdApproved) {
                this.totalApprovedMeruNPD++
              } if (element.isNpdApproved === false) {
                this.totalRejectMeruNPD++
              } if (element.isNpdApproved === null) {
                this.totalPendingMeruNPD++
              }
            }
            if (element.componentId === this.sharedService.universityComponentId) {
              this.totalFinalSubmitUniv++;

              if (element.isNpdApproved) {
                this.totalApprovedUnivNPD++
              } if (element.isNpdApproved === false) {
                this.totalRejectUnivNPD++
              } if (element.isNpdApproved === null) {
                this.totalPendingUnivNPD++
              }

            } if (element.componentId === this.sharedService.collegeComponentId) {
              this.totalFinalSubmitClg++;

              if (element.isNpdApproved) {
                this.totalApprovedClgNPD++
              } if (element.isNpdApproved === false) {
                this.totalRejectClgNPD++
              } if (element.isNpdApproved === null) {
                this.totalPendingClgNPD++
              }

            } if (element.componentId === this.sharedService.nmdcComponentId) {
              this.totalFinalSubmitNMDC++;

              if (element.isNpdApproved) {
                this.totalApprovedNMDCNPD++
              } if (element.isNpdApproved === false) {
                this.totalRejectNMDCNPD++
              } if (element.isNpdApproved === null) {
                this.totalPendingNMDCNPD++
              }

            } if (element.componentId === this.sharedService.genderComponentId) {
              this.totalFinalSubmitGender++;
              if (element.isNpdApproved) {
                this.totalApprovedGenderNPD++
              } if (element.isNpdApproved === false) {
                this.totalRejectGenderNPD++
              } if (element.isNpdApproved === null) {
                this.totalPendingGenderNPD++
              }

            }
          }
        }

      });
      if(this.sharedService.userTypeList['1'].id === this.userTypeId || this.userTypeId === this.sharedService.userTypeList['2'].id){
        this.getMeru();
        this.getUniv();
        this.getClg();
        this.getNMDC();
        this.getGender();
      }
      
      // this.getMeruNPD()
      // this.getUnivNPD();
      // this.getClgNPD();
      // this.getNMDCNPD();
      // this.getGenderNPD();



       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getMeru() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Total User", "Approve User", "Disapproved User", "Mapped User", "Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.meruTotalUser, this.approvedMeruUser, this.disapprovedMeruUse, this.meruMappedUser, this.totalFinalSubmitMeru, this.totalApprovedMeru, this.totalRejectMeru, this.totalPendingMeru],
            backgroundColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        // onClick: this.onBarClick.bind(this),
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: 'Multi-disciplinary Education and Research University (MERU)',
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: true,

            },
          },
        },
      },
    });
  }

  getUniv() {
    this.chart = new Chart("canvas1", {
      type: "bar",
      data: {
        labels: ["Total User", "Approve User", "Disapproved User", "Mapped User", "Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.universityTotalUser, this.approvedUniversityUser, this.disapprovedUniversityUse, this.universityMappedUser, this.totalFinalSubmitUniv, this.totalApprovedUniv, this.totalRejectUniv, this.totalPendingUniv],
            backgroundColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.univComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {

            ticks: {
              display: true,

            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getClg() {
    this.chart = new Chart("canvas2", {
      type: "bar",
      data: {
        labels: ["Total User", "Approve User", "Disapproved User", "Mapped User", "Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.collegeTotalUser, this.approvedCollegeUser, this.disapprovedCollegeUse, this.collegeMappedUser, this.totalFinalSubmitClg, this.totalApprovedClg, this.totalRejectClg, this.totalPendingClg],
            backgroundColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.clgComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getNMDC() {
    this.chart = new Chart("canvas3", {
      type: "bar",
      data: {
        labels: ["Total User", "Approve User", "Disapproved User", "Mapped User", "Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.ndmcTotalUser, this.approvedNmdcUser, this.disapprovedNmdcUse, this.nmdcMappedUser, this.totalFinalSubmitNMDC, this.totalApprovedNMDC, this.totalRejectNMDC, this.totalPendingNMDC],
            backgroundColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.nmdcComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getGender() {
    this.chart = new Chart("canvas4", {
      type: "bar",
      data: {
        labels: ["Total User", "Approve User", "Disapproved User", "Mapped User", "Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.equitTotalUser, this.approvedEquityUser, this.disapprovedEquityUser, this.equityMappedUser, this.totalFinalSubmitGender, this.totalApprovedGender, this.totalRejectGender, this.totalPendingGender],
            backgroundColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 2)",
              "rgba(75, 192, 192, 2)",
              "rgba(255, 206, 86, 2)",
              "rgba(250, 90, 27,2)",
              "rgba(60, 179, 113, 1)",
              "rgba(54, 162, 235, 2)",
              "rgba(255, 206, 86,2)",
              "rgba(75, 192, 192, 2)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.genderComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getMeruNPD() {
    this.chart = new Chart("canvasNPD", {
      type: "bar",
      data: {
        labels: ["Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.totalFinalSubmitMeru, this.totalApprovedMeruNPD, this.totalRejectMeruNPD, this.totalPendingMeruNPD],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: 'Multi-disciplinary Education and Research University (MERU)',
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,

            },
          },
        },
      },
    });
  }
  getUnivNPD() {
    this.chart = new Chart("canvasNPD1", {
      type: "bar",
      data: {
        labels: ["Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.totalFinalSubmitUniv, this.totalApprovedUnivNPD, this.totalRejectUnivNPD, this.totalPendingUnivNPD],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.univComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {

            ticks: {
              display: true,

            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getClgNPD() {
    this.chart = new Chart("canvasNPD2", {
      type: "bar",
      data: {
        labels: ["Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.totalFinalSubmitClg, this.totalApprovedClgNPD, this.totalRejectClgNPD, this.totalPendingClgNPD],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.clgComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getNMDCNPD() {
    this.chart = new Chart("canvasNPD3", {
      type: "bar",
      data: {
        labels: ["Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.totalFinalSubmitNMDC, this.totalApprovedNMDCNPD, this.totalRejectNMDCNPD, this.totalPendingNMDCNPD],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.nmdcComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  getGenderNPD() {
    this.chart = new Chart("canvasNPD4", {
      type: "bar",
      data: {
        labels: ["Final Submit", "Approved", "Reject", "Pending"],
        datasets: [
          {
            data: [this.totalFinalSubmitGender, this.totalApprovedGenderNPD, this.totalRejectGenderNPD, this.totalPendingGenderNPD],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",

            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",

            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false,
          }, title: {
            display: true,
            text: this.genderComponent,
            position: 'bottom'
          },
        },
        scales: {
          x: {
            ticks: {
              display: true,
            },
          },
          y: {
            ticks: {
              display: true,
            },
          },
        },
      },
    });
  }
  ngAfterViewInit() {

  }
  onBarClick(event, elements) {

    if (elements.length > 0) {

      const index = elements[0]._index;
      // Handle the bar click event
      const label = elements[0]._chart.config.data.labels[index];

      // Handle the bar click event with the label
      // Open a new page or navigate to a different route
      window.open('https://example.com', '_blank');
    }
  }
  goToNPD() {
    this.router.navigate([this.routers.consolidatedProposalForworded]);
  }
}
