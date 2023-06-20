import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { apiData } from 'src/app/model/apiModel';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription = Subscription.EMPTY
  apiQuery: HttpParams = new HttpParams()
  apiResponse$: Observable<apiData[]> | undefined
  correctAnswerAmount: number = 0
  currentAnswers: string[] = []
  currentIndex: number = 0
  noneSelected: boolean = false

  constructor(
    private route: ActivatedRoute,
    private apiService: QuizApiService,
  ) { }

  ngOnInit(): void {
    this.Subscribe()
  }

  ngOnDestroy(): void {
    this.Unsubscribe()
  }

  Proceed(currentQuestion: apiData) {
    if (this.currentAnswers.length < 1) {
      this.noneSelected = true
      return
    }

    this.validateAnswers(currentQuestion)
    this.updateQuestion()
    this.currentIndex++
  }

  Return() {
    this.currentIndex--
    this.updateQuestion()
  }

  updateQuestion() {
    this.currentAnswers = []
  }

  Subscribe() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.apiQuery = new HttpParams().appendAll({
        ['difficulty']: params['difficulty'],
        ['category']: params['category'],
        ['limit']: params['limit']
      })
      this.apiResponse$ = this.apiService.getQuizz(this.apiQuery)
    })
  }

  Unsubscribe() {
    this.routeSubscription.unsubscribe()
  }

  selectAnswer(e: Event) {
    const field = e.target as HTMLInputElement

    if (!field.checked) {
      this.currentAnswers.filter(value => value !== field.value)
      return
    }

    this.noneSelected = false

    if (e.type === 'radio') {
      this.currentAnswers[0] = field.value
      return
    }

    this.currentAnswers.push(field.value)
  }

  validateAnswers(question: apiData) {
    for (const answer of this.currentAnswers) {
      switch (answer) {
        case 'answer_a':
          question.correct_answers.answer_a_correct === 'true'
            ? this.correctAnswerAmount++ : this.correctAnswerAmount = 0
          break;
        case 'answer_b':
          question.correct_answers.answer_b_correct === 'true'
            ? this.correctAnswerAmount++ : this.correctAnswerAmount = 0
          break;
        case 'answer_c':
          question.correct_answers.answer_c_correct === 'true'
            ? this.correctAnswerAmount++ : this.correctAnswerAmount = 0
          break;
        case 'answer_d':
          question.correct_answers.answer_d_correct === 'true'
            ? this.correctAnswerAmount++ : this.correctAnswerAmount = 0
          break;
        case 'answer_e':
          question.correct_answers.answer_e_correct === 'true'
            ? this.correctAnswerAmount++ : this.correctAnswerAmount = 0
          break;
        case 'answer_f':
          question.correct_answers.answer_f_correct === 'true'
            ? this.correctAnswerAmount++ : this.correctAnswerAmount = 0
          break;
      }
    }
  }
}
