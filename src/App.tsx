import { useEffect, useState } from 'react'
import * as C from './App.styles';
import logoImage from './assets/devmemory_logo.png'
import RestartIcon from './svgs/restart.svg'
import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItemType } from './types/GridItemType';
import { itens } from './data/items'

const App = () => {
  const [playing, Setplaying] = useState<boolean>(false);
  const [timeElapsed, SetTimeElapsed] = useState<number>(0);
  const [moveCount, SetMoveCount] = useState<number>(0);
  const [showCount, SetShowCount] = useState<number>(0);
  const [gridItems, SetGridItems] = useState<GridItemType[]>([]);


  useEffect(()=> resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // passo 1 resetar o jogo
    SetTimeElapsed(0);
    SetMoveCount(0);
    SetShowCount(0);

    // passo 2 - criar o grid
    // 2.1 - criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for( let i = 0; i < (itens.length * 2); i++) {tmpGrid.push({
      item: null,shown: false,permanentShown: false
    })};
    //2.2 - preencher o grid

    //2.3 - jogar no state
    SetGridItems(tmpGrid);

    // passo 3 - começar o jogo
    Setplaying(true);

  }

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href=''>
          <img src={logoImage} width='200' alt=''/>
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label='Tempo' value='00:00'/>
          <InfoItem label='Movimentos' value='0'/>
        </C.InfoArea>

        <Button label='Reniciar' icon={RestartIcon} onClick={resetAndCreateGrid}/>
      </C.Info>
      <C.GridArea>
        <C.Grid>

        </C.Grid>
      </C.GridArea>
    </C.Container>
      

      
  
  );
}

export default App
