import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { apiData } from 'src/app/model/apiModel';
import { QuizApiService } from 'src/app/services/quiz-api.service';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription = Subscription.EMPTY
  apiSubscription: Subscription = Subscription.EMPTY
  apiQuery: HttpParams = new HttpParams()
  apiResponse!: apiData[]
  currentPage: number = 1
  currentQuestion!: apiData
  rightAnswersAmount: number = 0
  currentAnswers: string[] = []
  noneSelected: boolean = false
  isOver: boolean = false


  constructor(private route: ActivatedRoute, private apiService: QuizApiService) { }

  ngOnInit(): void {
    this.Subscribe()
  }

  ngOnDestroy(): void {
    this.Unsubscribe()
  }

  Proceed() {
    if(this.currentAnswers.length < 1) {
      this.noneSelected = true
      return
    }

    if(this.currentPage < this.apiResponse.length) {
      this.currentPage++
      this.updateQuestion()
      return
    }

    this.isOver = true
  }

  previousQuestion() {
    this.currentPage--
    this.updateQuestion()
  }

  updateQuestion() {
    this.currentAnswers = []
    this.currentQuestion = this.apiResponse![this.currentPage - 1]
  }

  Subscribe() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.apiQuery = new HttpParams().appendAll({
        ['difficulty']: params['difficulty'],
        ['category']: params['category'],
        ['limit']: params['limit']
      })
    })

    this.apiSubscription = this.apiService.getQuizz(this.apiQuery)
      .subscribe(result => {
        this.apiResponse = result
        this.updateQuestion()
      })
  }

  Unsubscribe() {
    this.apiSubscription.unsubscribe()
    this.routeSubscription.unsubscribe()
  }

  selectAnswer(e: Event) {
    const field = e.target as HTMLInputElement

    if(!field.checked){
      this.currentAnswers.filter(value => value !== field.value)
      return
    }

    this.noneSelected = false

    if (this.currentQuestion.multiple_correct_answers === 'false') {
      this.currentAnswers[0] = field.value
      this.validateAnswers(field.id)
      return
    }

      this.currentAnswers.push(field.value)
      this.validateAnswers(field.id)
      return
  }

  validateAnswers(answer: string) {
    switch (answer) {
      case 'answer_a':
        this.currentQuestion.correct_answers.answer_a_correct === 'true'
          ? this.rightAnswersAmount++ : this.rightAnswersAmount = 0
        break;
      case 'answer_b':
        this.currentQuestion.correct_answers.answer_b_correct === 'true'
          ? this.rightAnswersAmount++ : this.rightAnswersAmount = 0
        break;
      case 'answer_c':
        this.currentQuestion.correct_answers.answer_c_correct === 'true'
          ? this.rightAnswersAmount++ : this.rightAnswersAmount = 0
        break;
      case 'answer_d':
        this.currentQuestion.correct_answers.answer_d_correct === 'true'
          ? this.rightAnswersAmount++ : this.rightAnswersAmount = 0
        break;
      case 'answer_e':
        this.currentQuestion.correct_answers.answer_e_correct === 'true'
          ? this.rightAnswersAmount++ : this.rightAnswersAmount = 0
        break;
      case 'answer_f':
        this.currentQuestion.correct_answers.answer_f_correct === 'true'
          ? this.rightAnswersAmount++ : this.rightAnswersAmount = 0
        break;
      default:
        break;
    }
  }
}
