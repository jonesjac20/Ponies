declare module './readPlayersCSV' {

    function readPlayersCSV(filePath: string): Promise<Players>;
  
    export default readPlayersCSV;
  
  }