# Git仓库的分支(Branch)规范
    Git:主干(master)、分支(branch)、标记(tag):


#### Tag (标签|里程碑）：

便于开发成员识别项目的每个版本。

1. master（master branch）

    即可安全运行的稳定分支，一般是已上线的分支，处于(production-ready)状态。禁止直接代码提交，避免被污染，仅用于代码合并和归集，在这个分支上的代码应该永远是可用、稳定的。当需要拉一个新开发分支时，应该基于 master。

2. 开发分支（develop || development branch）：

    顾名思义即在持续开发的分支，每个开发组都在这个分支上保持线性的持续小步迭代，正常的CodeReview WorkFlow和开发级的自动CI也在这里进行。 当开发完一个迭代(Sprint)，开发团队完成后转测试时，就将代码合并到 release 分支， 并要求打一个alpha级的Tag(如1.1.0-alpha)。

3. 功能分支（feature branch）：

    开发人员对某个功能完成后，会提交到这个分支，feature拆分的粒度依据功能的独立性来判断。该分支上的内容处于WIP（Work in progress）可能功能还未完成、未进行联调等，在后面某个时间点：功能完成并且联调通过后，最后合并到develop分支。

4. 预发分支（release branch）：
    
    用于发布过程的分支，包括开发转测(实际上我们认为这里的测试集成测试)、测试和BugFix以及发布上线的过程。当发布成功时，打一个发布beta Tag(如 1.1.1-beta)，并将代码合并到 master 分支。

5. 补丁分支（hotfix branch）：
    
    当出现线上Bug需要hotfix时，等不及 release 版本了！必须马上修复上线，我们需要在上次上线的Tag处拉一个临时的分支（hotfix 热修复分支 ），fix bug后 merge 回 master 和 develop。


###### Git Flow是构建在Git之上的一个组织软件开发活动的模型，是在Git之上构建的一项软件开发最佳实践。Git Flow是一套使用Git进行源代码管理时的一套行为规范

