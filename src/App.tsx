/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { useEffect, useState } from 'react'
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { itens } from './data/items'
import { GridItem } from './components/GridItem';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

const App = () => {
  const [playing, Setplaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);


  useEffect(()=> resetAndCreateGrid(), []);

  useEffect(()=> {
    const timer = setInterval(()=>{
      if(playing){
        setTimeElapsed(timeElapsed + 1)
      }
    },1000);
    return ()=> clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(()=> {
    if(shownCount === 2){
      let opened = gridItems.filter(item => item.shown === true);
      if(opened.length === 2){

        if(opened[0].item === opened[1].item){
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0)
        } else{
          setTimeout(() => {
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid){
            tmpGrid[i].shown = false;
          }
          setGridItems(tmpGrid);
          setShownCount(0)
          }, 1000);
        }
        setMoveCount(moveCount => moveCount + 1);
      }
    }
  },[shownCount, gridItems])

  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)){
      Setplaying(false);
    }
  },[moveCount, gridItems])

  const resetAndCreateGrid = () => {
    // passo 1 resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // passo 2 - criar o grid
    // 2.1 - criar um grid vazio
    const tmpGrid: GridItemType[] = [];
    for( let i = 0; i < (itens.length * 2); i++) tmpGrid.push({
      item: null,shown: false,permanentShown: false
    });
    //2.2 - preencher o grid
    for(let w=0; w<2; w++){
      for(let i = 0; i < itens.length; i++){
       let pos = -1;
       while (pos < -1 || tmpGrid[pos].item !== null){
        pos = Math.floor(Math.random() * (itens.length * 2)) 
       }
       tmpGrid[pos].item = 1;
      }
    }
    //2.3 - jogar no state
    setGridItems(tmpGrid);
    
    // passo 3 - começar o jogo
    Setplaying(true);
  }

  const handleItemClick = (index:number) => {
    if(playing && index !== null && shownCount < 2){
      let tmpGrid = [...gridItems];

      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown ===false){
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(tmpGrid);
    }
  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logoImage} width='200' alt=''/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value={ formatTimeElapsed(timeElapsed) }/>
          <InfoItem label='Movimentos' value={moveCount.toString()}/>
        </C.InfoArea>

        <Button label='Reniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) =>(
            <GridItem 
              key={index}
              item={item}
              onClick={()=> handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
}

export default App
