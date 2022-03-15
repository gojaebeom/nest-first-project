## NestJs 프레임워크 스터디

```
1. nestjs 공식문서를 바탕으로 기본적인 컨트롤러, 서비스, 리포지토리 단위의 설계하는 방법 배우기
2. mysql 연동 및 typeorm 사용하는 방법 배우기
3. 미들웨어, 필터, 파이프, 가드, 인터셉터, 커스텀 데코레이터를 다루는 기본적인 방법 습득
```

### 공급자의 개념

`Service`, `Repository` 등의 클래스는 대부분 `공급자(Provider)`로 취급된다. nestjs, spring과 같은 프레임워크가 제공하는 기술중 `DI(dependency injection)`에 해당하는 말이다.
</br>
비슷한 예로 스프링 프레임워크에서는 controller에서 사용할 service 클래스들은 `@Service` 또는 `@Component` 어노테이션을 명시한다. 이 경우 controller 클래스에서 new 연산자를 사용하지 않고 `@Autowired` 어노테이션으로 DI를 할 수 있다.
</br>
nestjs에서 클래스를 공급자로 만드는 방법은 다음과 같다.

```ts
- cat.service.ts
// injectable 데코레이터를 클래스선언문 위에 붙인다.
@Injectable()
export class CatService { ... }

- cat.module.ts
// 공급자:providers의 의존성 배열에 추가해준다.
// 사용하고자하는 controller에서(또는 providers에 명시되어있는 다른 공급자에서) providers에 있는 클래스들을 의존성 주입받을 수 있다.
@Module({
  imports: [TypeOrmModule.forFeature([Cats]), AuthModule],
  controllers: [CatController],
  providers: [CatService], <-- here
  exports: [],
})
export class CatsModule {}

```
