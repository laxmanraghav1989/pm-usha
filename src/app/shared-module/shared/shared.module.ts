import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionDialogComponent } from 'src/app/dialog/institution-dialog/institution-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FinalSubmitDialogComponent } from 'src/app/dialog/final-submit-dialog/final-submit-dialog.component';
import { SetPasswordDialogComponent } from 'src/app/dialog/set-password-dialog/set-password-dialog.component';
import { ErrorDialogComponent } from 'src/app/dialog/error-dialog/error-dialog.component';
import { ChangePasswordDialogComponent } from 'src/app/dialog/change-password-dialog/change-password-dialog.component';
import { ReloginDialogComponent } from 'src/app/dialog/relogin-dialog/relogin-dialog.component';
import { DeleteDialogComponent } from 'src/app/dialog/delete-dialog/delete-dialog.component';
import { UnlockMessageComponent } from 'src/app/dialog/unlock-message/unlock-message.component';
import { AllownumberanddecimalDirective } from 'src/app/directive/allownumberanddecimal.directive';
import { AlphabetDirective } from 'src/app/directive/alphabet.directive';
import { ScoreBreakupDialogComponent } from 'src/app/dialog/score-breakup-dialog/score-breakup-dialog.component';
import { CostBreakDialogComponent } from 'src/app/dialog/cost-break-dialog/cost-break-dialog.component';
import { InputWithCommaDirective } from 'src/app/directive/input-with-comma.directive';
import { UserActionDialogComponent } from 'src/app/dialog/user-action-dialog/user-action-dialog.component';
import { PartialLockUnlockComponent } from 'src/app/dialog/partial-lock-unlock/partial-lock-unlock.component';
import { UnlockStatusDialogComponent } from 'src/app/dialog/unlock-status-dialog/unlock-status-dialog.component';
import { SessionExpireDialogComponent } from 'src/app/dialog/session-expire-dialog/session-expire-dialog.component';
import { UnlockConsolidatedDialogComponent } from 'src/app/dialog/unlock-consolidated-dialog/unlock-consolidated-dialog.component';
import { ForwardConfirmationDialogComponent } from 'src/app/dialog/forward-confirmation-dialog/forward-confirmation-dialog.component';
import { RemarksComponent } from 'src/app/dialog/remarks/remarks.component';
import { ScoreCommentDialogComponent } from 'src/app/dialog/score-comment-dialog/score-comment-dialog.component';
import { MessageDialogComponent } from 'src/app/dialog/message-dialog/message-dialog.component';
import { PercentageDirective } from 'src/app/directive/percentage.directive';
import { PabCommentDialogComponent } from 'src/app/dialog/pab-comment-dialog/pab-comment-dialog.component';
import { AllowalphanumericDirective } from 'src/app/directive/allowalphanumeric.directive';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { InsCommentDialogComponent } from 'src/app/dialog/ins-comment-dialog/ins-comment-dialog.component';
import { OnlyPositiveNumber } from 'src/app/directive/only-positive-number.directive';
import { RupeesFormatPipe } from '../../pipe/rupees-format.pipe';
import { OutcomeJustificationDialogComponent } from 'src/app/dialog/outcome-justification-dialog/outcome-justification-dialog.component';
import { RevisionLockUnlockComponent } from 'src/app/dialog/revision-lock-unlock/revision-lock-unlock.component';
import { ReadMoreComponent } from 'src/app/pm-usha/proposal-revision/read-more/read-more.component';
import { NumericDirective } from 'src/app/directive/numeric.directive';
import { OnlyNumericDirective } from 'src/app/directive/only-numeric.directive';
import { OnlyAllowedCharactersDirective } from 'src/app/directive/only-allowed-characters.directive';
import { OnlypluscharcterDirective } from 'src/app/directive/onlypluscharcter.directive';
import { UploadDocumentCertificateComponent } from 'src/app/pm-usha/upload-document-certificate/upload-document-certificate.component';
import { UpdationRusaDialogComponent } from '../../dialog/updation-rusa-dialog/updation-rusa-dialog.component';
import { StateIssueDialogComponent } from 'src/app/dialog/state-issue-dialog/state-issue-dialog.component';
import { ItemTaggingDialogComponent } from 'src/app/dialog/item-tagging-dialog/item-tagging-dialog.component';
import { ConfirmAisheDialogComponent } from 'src/app/dialog/confirm-aishe-dialog/confirm-aishe-dialog.component';
import { UploadImageDialogComponent } from 'src/app/dialog/upload-image-dialog/upload-image-dialog.component';
import { GenderEquityValidationService } from 'src/app/service/gender-equity-validation.service';
import { EmailSmsDialogComponent } from 'src/app/dialog/email-sms-dialog/email-sms-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';





@NgModule({
  declarations: [OnlyNumericDirective, NumericDirective, ReadMoreComponent,RupeesFormatPipe, ScoreCommentDialogComponent, InstitutionDialogComponent, FinalSubmitDialogComponent, SetPasswordDialogComponent,
    ErrorDialogComponent, ChangePasswordDialogComponent, PartialLockUnlockComponent,
    UserActionDialogComponent, ReloginDialogComponent, ConfirmDialogComponent, DeleteDialogComponent,
    MessageDialogComponent, UnlockMessageComponent, AllownumberanddecimalDirective, OnlyPositiveNumber,
    AlphabetDirective, UnlockStatusDialogComponent,UpdationRusaDialogComponent,
    ScoreBreakupDialogComponent, CostBreakDialogComponent, InputWithCommaDirective, SessionExpireDialogComponent,
    UnlockConsolidatedDialogComponent, ForwardConfirmationDialogComponent, RemarksComponent, PercentageDirective,
    PabCommentDialogComponent, AllowalphanumericDirective, InsCommentDialogComponent, OutcomeJustificationDialogComponent, RevisionLockUnlockComponent, OnlyAllowedCharactersDirective, OnlypluscharcterDirective,UploadDocumentCertificateComponent, StateIssueDialogComponent, ItemTaggingDialogComponent,ConfirmAisheDialogComponent, UploadImageDialogComponent, EmailSmsDialogComponent],
  imports: [
    CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule, MatSelectFilterModule, NgxPaginationModule, AngularEditorModule
  ],
  entryComponents: [ScoreCommentDialogComponent, InstitutionDialogComponent, ScoreBreakupDialogComponent, UnlockMessageComponent, FinalSubmitDialogComponent, SetPasswordDialogComponent,
    ErrorDialogComponent, ChangePasswordDialogComponent, ReloginDialogComponent, MessageDialogComponent, ConfirmDialogComponent, DeleteDialogComponent, UserActionDialogComponent, PartialLockUnlockComponent
    , UnlockStatusDialogComponent,UpdationRusaDialogComponent, SessionExpireDialogComponent, UnlockConsolidatedDialogComponent, ForwardConfirmationDialogComponent, RemarksComponent, PabCommentDialogComponent,
    InsCommentDialogComponent, OutcomeJustificationDialogComponent, RevisionLockUnlockComponent, StateIssueDialogComponent, ItemTaggingDialogComponent,ConfirmAisheDialogComponent, UploadImageDialogComponent, GenderEquityValidationService, EmailSmsDialogComponent],

  exports: [OnlyNumericDirective,NumericDirective, ReadMoreComponent,RupeesFormatPipe, ScoreCommentDialogComponent, InstitutionDialogComponent, UnlockMessageComponent, FinalSubmitDialogComponent, SetPasswordDialogComponent, ErrorDialogComponent,
    ChangePasswordDialogComponent, ReloginDialogComponent, MessageDialogComponent, ConfirmDialogComponent, DeleteDialogComponent, UserActionDialogComponent, PartialLockUnlockComponent,
    AllownumberanddecimalDirective, AlphabetDirective, ScoreBreakupDialogComponent, CostBreakDialogComponent, InputWithCommaDirective, OutcomeJustificationDialogComponent,
    UnlockStatusDialogComponent,UpdationRusaDialogComponent, SessionExpireDialogComponent, UnlockConsolidatedDialogComponent, ForwardConfirmationDialogComponent, RemarksComponent, PercentageDirective, PabCommentDialogComponent, AllowalphanumericDirective, InsCommentDialogComponent, OnlyPositiveNumber, RevisionLockUnlockComponent, OnlyAllowedCharactersDirective, OnlypluscharcterDirective,UploadDocumentCertificateComponent, StateIssueDialogComponent, ItemTaggingDialogComponent,ConfirmAisheDialogComponent, UploadImageDialogComponent, EmailSmsDialogComponent]
})
export class SharedModule { }
