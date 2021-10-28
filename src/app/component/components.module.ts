import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsRoutingModule } from './components-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchPageComponent } from './search-page/search-page.component';


@NgModule({
  declarations: [
    //components view class
    LandingPageComponent,
    SearchPageComponent
  ],
  imports: [
    //module, manager 다른 모듈에서 노출한 뷰클래스들을 사용하기 위해 해당 모듈 임포트
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsRoutingModule
  ],
  exports: [
    //declarations에서 정의한 현재 모듈이 구성요소를 다른 모듈의 템플릿에서 사용할 수 있도록 노출 시킬 뷰 클래스 지정 
  ],
  providers: [
    //공통 서비스의 등록, 등록된 서비스는 앱의 모든 부분에서 사용가능
  ],
  bootstrap: [
    //메인뷰로 사용될 루트 컴포넌트 지정, 루트모듈에서만 지정가능
  ]
})
export class ComponentsModule { }
