namespace CasinoApi.Models
{
    public class OperationResult
    {
        public bool Success { get; set; } = true;
        public List<string> Errors { get; set; } = new();
    }
}
